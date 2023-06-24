import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { prisma } from "../config";
import { ShareInterfaces } from "../interfaces";
import storage from "../config/storage";
import { Request, Response } from "express";
import CryptoJS from "crypto-js";
class ShareService implements ShareInterfaces {
    private ShareModel: typeof prisma.share;

    constructor() {
        this.ShareModel = prisma.share
    }


    async store(req: Request, res: Response): Promise<Response> {
        try {
            const ext = req.file?.originalname.split('.').pop()
            const fileName = `${CryptoJS.SHA1(`${new Date().getTime().toString()}`).toString()}.${ext}`
            const storageref = ref(storage, `fq-share/${fileName}`);
            const upload = await uploadBytes(storageref, req.file?.buffer!)
            if (upload) {
                const downloadURl = await getDownloadURL(storageref)

                const create = await this.ShareModel.create({
                    data: {
                        downloadUrl: downloadURl,
                        FileName: req.file?.originalname!,
                    }
                })

                return res.json({
                    message: 'ok',
                    status: 200,
                })
            } else {
                return res.status(400).json({
                    message: 'error on upload',
                    status: 400
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'internal server error',
                status: 500,
                error: err
            }).end()
        }
    }
}

export default ShareService