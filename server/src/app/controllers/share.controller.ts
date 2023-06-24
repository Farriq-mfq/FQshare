import { Request, Response } from "express";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../config/storage";
import ShareService from "../service/share.service";
import CryptoJS from "crypto-js";
class ShareController {
    protected static service: ShareService;
    constructor() {
        ShareController.service = new ShareService();
    }

    index(req: Request, res: Response) {
        return res.send('ok');
    }

    async upload(req: Request, res: Response) {
        return await ShareController.service.store(req, res)
    }

    download(req: Request, res: Response) {
        return res.json('/download')
    }
}

export default new ShareController();