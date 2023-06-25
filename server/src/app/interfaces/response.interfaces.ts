import { Response } from "express"
import HttpStatusCode from "../enums/httpcode.enum"

interface ResponseInterface<T> {
    status: HttpStatusCode,
    data: T,
    res: Response
}
interface ResponseErrorInterface<T> {
    status: HttpStatusCode,
    error: T,
    context?: string,
    res: Response
}

export {
    ResponseInterface,
    ResponseErrorInterface

}