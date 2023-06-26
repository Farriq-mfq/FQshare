import { Share } from "@prisma/client"
import { ShareInput } from "../web/input/share.input"

interface ShareInterfaces {
    find(id: string): Promise<Share | null>
    store(input: ShareInput, file: Express.Multer.File):Promise<Share>
}

export default ShareInterfaces