import { Share } from "@prisma/client";
import Bcrypt from 'bcryptjs';
import { Request, Response, json } from "express";
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
        try {
            const { id } = req.params as { id: string }
            const share = await ShareController.service.find(id);
            if (share?.Password) {
                return ResponseHttpError({ error: { status: 'Need Password' }, status: HttpStatusCode.UNAUTHORIZED_401, context: "UNAUTHORIZED", res })
            } else {
                return ResponseOk({ res, status: HttpStatusCode.OK_200, data: { share } })
            }
        } catch (err) {
            if (err instanceof ResponseError) {
                return ResponseHttpError({ status: err.status, error: { error: JSON.parse(err.message) }, context: err.context, res });
            } else {
                return ResponseHttpError({ status: 500, error: { error: 'INTERNAL SERVER ERROR' }, context: "INTERNAL_SERVER_ERROR", res });
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
            } else {
                return ResponseHttpError({ status: 500, error: { error: 'INTERNAL SERVER ERROR' }, context: "INTERNAL_SERVER_ERROR", res });
            }
        }
    }

    async download(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string }
            const share = await ShareController.service.find(id);
            const input = validation<{ password: string }>(SharePasswordValidation, req.body)
            if (share?.Password != null) {
                const compare = await Bcrypt.compare(input.password, share.Password)
                if (compare) {
                    const objShare = share as Partial<Share>
                    delete objShare.Password;
                    return ResponseOk({ res, status: HttpStatusCode.OK_200, data: { share: objShare } })
                } else {
                    return ResponseHttpError({ error: { status: 'Wrong password' }, status: HttpStatusCode.UNAUTHORIZED_401, context: "UNAUTHORIZED", res })
                }
            } else {
                return ResponseHttpError({ error: { status: 'Not allowed access' }, status: HttpStatusCode.FORBIDDEN_403, context: "FORBIDDEN", res })
            }

        } catch (err) {
            if (err instanceof ResponseError) {
                return ResponseHttpError({ status: err.status, error: { error: JSON.parse(err.message) }, context: err.context, res });
            } else {
                console.log(err)
                return ResponseHttpError({ status: 500, error: { error: 'INTERNAL SERVER ERROR' }, context: "INTERNAL_SERVER_ERROR", res });
            }
        }
    }
}

export default new ShareController();