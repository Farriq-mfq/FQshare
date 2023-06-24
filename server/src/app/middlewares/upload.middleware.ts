import { NextFunction, Request, Response } from "express"
import multer, { MulterError } from "multer"

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 0.5
        }
    }).single('file')
    upload(req, res, function (err) {
        if (err instanceof MulterError) {
            return res.status(500).json({
                error: err.message
            })
        }
        next()
    })
}

export default uploadMiddleware