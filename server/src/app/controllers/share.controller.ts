import { Request, Response } from "express";
import logger from "../logger";
import {} from 'express'
class ShareController {
    constructor() {

    }

    upload(req: Request, res: Response) {
        return res.json('/upload')
    }

    download(req: Request, res: Response) {
        return res.json('/download')
    }
}

export default new ShareController();