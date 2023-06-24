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
    res: Response
}

export {
    ResponseInterface,
    ResponseErrorInterface

}