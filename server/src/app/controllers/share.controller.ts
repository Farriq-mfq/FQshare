import { Share } from "@prisma/client";
import Bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import HttpStatusCode from "../enums/httpcode.enum";
import ResponseError from "../errors/response.error";
import ShareService from "../service/share.service";
import { ResponseHttpError, ResponseOk } from "../utils/response.utils";
import { SharePasswordValidation, ShareValidation } from "../validations/share.validation";
import validation from "../validations/validation";
import { ShareInput } from "../web/input/share.input";
class ShareController {
    protected static service: ShareService;
    constructor() {
        ShareController.service = new ShareService();
    }

    async index(req: Request, res: Response) {
        const { id } = req.params as { id: string }
        try {
            const share = await ShareController.service.find(id);
            if (share?.Password) {
                const input = validation<{ password: string }>(SharePasswordValidation, req.body)
                const compare = await Bcrypt.compare(input.password, share.Password)
                if (compare) {
                    const objShare: Partial<Share> = share;
                    delete objShare.Password
                    return ResponseOk({ res, status: HttpStatusCode.OK_200, data: { objShare } })
                } else {
                    return ResponseHttpError({ error: { status: 'Wrong password' }, status: HttpStatusCode.UNAUTHORIZED_401, context: "UNAUTHORIZED", res })
                }
            }
            return ResponseOk({ res, status: HttpStatusCode.OK_200, data: { share } })
        } catch (err) {
            if (err instanceof ResponseError) {
                return ResponseHttpError({ status: err.status, error: { error: JSON.parse(err.message) }, context: err.context, res });
            }
        }
    }

    async upload(req: Request, res: Response) {
        try {
            const input = validation<ShareInput>(ShareValidation, req.body)
            if (!req.file) {
                return ResponseHttpError({ status: HttpStatusCode.BAD_REQUEST_400, error: { error: "please select your file" }, res, context: "FILE_VALIDATION" })
            }
            const store: Share = await ShareController.service.store(input, req.file!)
            if (store) {
                return ResponseOk<{ id: string }>({ res, status: HttpStatusCode.OK_200, data: { id: store.id } })
            } else {
                throw new ResponseError('something error', HttpStatusCode.BAD_REQUEST_400)
            }
        } catch (err) {
            if (err instanceof ResponseError) {
                return ResponseHttpError({ status: err.status, error: { error: JSON.parse(err.message) }, context: err.context, res });
            }
        }
    }
}

export default new ShareController();