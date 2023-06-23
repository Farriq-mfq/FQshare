import { Request, Response } from "express";
import { ref } from "firebase/storage";
import storage from "../config/storage";
import ShareService from "../service/share.service";
class ShareController {
    protected static service: ShareService;
    constructor() {
        ShareController.service = new ShareService();
    }
    upload(req: Request, res: Response) {
        // form upload with multer
        const storageref = ref(storage, `fq-share/${}`);
        console.log(req.file?.buffer)
        return res.json({ 'success': true })
    }

    download(req: Request, res: Response) {
        return res.json('/download')
    }
}

export default new ShareController();