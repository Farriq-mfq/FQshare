import { Request, Response } from "express";
import logger from "../logger";
import { } from 'express'
import shareService from "../service/share.service";
class ShareController {
    // private service;
    constructor() {
        // this.service = new shareService();
    }

    upload(req: Request, res: Response) {
        return res.json('/upload')
    }

    download(req: Request, res: Response) {
        return res.json('/download')
    }
}

export default new ShareController();