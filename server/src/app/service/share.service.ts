import { prisma } from "../config";
import { ShareInterfaces } from "../interfaces";
import PrismaClient from '@prisma/client'
class ShareService implements ShareInterfaces {
    private ShareModel: typeof prisma.share;

    constructor() {
        this.ShareModel = prisma.share
    }


    async store(): Promise<void> {
        try {
            await this.ShareModel.create({
                data: {
                    FileName: "test"
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export default ShareService