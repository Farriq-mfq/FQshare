import { Share } from "@prisma/client";
import Bcrypt from 'bcryptjs';
import CryptoJS from "crypto-js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { prisma } from "../config";
import storage from "../config/storage";
import ResponseError from "../errors/response.error";
import { ShareInterfaces } from "../interfaces";
import { ShareInput } from "../web/input/share.input";
class ShareService implements ShareInterfaces {
    private ShareModel: typeof prisma.share;

    constructor() {
        this.ShareModel = prisma.share
    }

    async find(id: string): Promise<Share | null> {
        try {
            const share = await this.ShareModel.findUnique({ where: { id } })
            return share;
        } catch (err) {
            throw new ResponseError('internal server error', 500)
        }
    }


    async store(input: ShareInput, file: Express.Multer.File): Promise<Share> {
        try {
            const ext = file?.originalname.split('.').pop()
            const fileName = `${CryptoJS.SHA1(`${new Date().getTime().toString()}`).toString()}.${ext}`
            const storageref = ref(storage, `fq-share/${fileName}`);
            const upload = await uploadBytes(storageref, file?.buffer!)
            if (upload) {
                const downloadURl = await getDownloadURL(storageref)
                return await this.ShareModel.create({
                    data: {
                        downloadUrl: downloadURl,
                        FileName: fileName,
                        originalFileName: file.originalname,
                        Password: input.password ? (await Bcrypt.hash(input.password, 10)).toString() : null
                    }
                })

            } else {
                throw new ResponseError('error on upload', 400)
            }
        } catch (err) {
            throw new ResponseError('internal server error', 500)
        }
    }
}

export default ShareService