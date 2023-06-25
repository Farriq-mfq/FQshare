import { Response } from "express"
import { ResponseErrorInterface, ResponseInterface } from "../interfaces"

const ResponseOk = <T extends {}>({ status, data, res }: ResponseInterface<T>): Response => {
    return res.status(status).json({ status: status, ...data }).end()
}

const ResponseHttpError = <T extends {}>({ status, error, res, context }: ResponseErrorInterface<T>): Response => {
    return res.status(status).json({ status: status, ...error, context }).end()
}

export {
    ResponseHttpError, ResponseOk
}
