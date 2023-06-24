import { Share } from "@prisma/client";
import Bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import { baseUrl } from "../config/baseurl";
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
                    ResponseOk({ res, status: HttpStatusCode.OK_200, data: { objShare } })
                } else {
                    ResponseHttpError({ error: { status: 'Wrong password' }, status: HttpStatusCode.UNAUTHORIZED_401, res })
                }
            }
            ResponseOk({ res, status: HttpStatusCode.OK_200, data: { share } })
        } catch (err) {
            if (err instanceof ResponseError) {
                ResponseHttpError({ status: err.status, error: { error: JSON.parse(err.message) }, res });
            }
        }
    }

    async upload(req: Request, res: Response) {
        try {
            const input = validation<ShareInput>(ShareValidation, req.body)
            if (!req.file) {
                return ResponseHttpError({ status: HttpStatusCode.BAD_REQUEST_400, error: { error: "file does'nt exist" }, res })
            }
            const store: Share = await ShareController.service.store(input, req.file!)
            if (store) {
                ResponseOk<{ url: string }>({ res, status: HttpStatusCode.OK_200, data: { url: `${baseUrl()}/share/${store.id}` } })
            } else {
                throw new ResponseError(`something error`, HttpStatusCode.BAD_REQUEST_400)
            }
        } catch (err) {
            if (err instanceof ResponseError) {
                return ResponseHttpError({ status: err.status, error: { error: JSON.parse(err.message) }, res });
            }
        }
    }
}

export default new ShareController();