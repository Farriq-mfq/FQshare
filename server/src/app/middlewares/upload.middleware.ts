import { NextFunction, Request, Response } from "express"
import multer, { MulterError } from "multer"
import { ResponseHttpError } from "../utils/response.utils"
import HttpStatusCode from "../enums/httpcode.enum"

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 25
        },
    }).single('file')

    upload(req, res, function (err) {
        if (err instanceof MulterError) {
            return ResponseHttpError({ status: HttpStatusCode.BAD_REQUEST_400, error: { error: err.message }, context: "FILE_TO_LARGE", res })
        }
        next()
    })
}

export default uploadMiddleware