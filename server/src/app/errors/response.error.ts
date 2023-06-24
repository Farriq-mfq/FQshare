import HttpStatusCode from "../enums/httpcode.enum";
class ResponseError extends Error {
    public status: HttpStatusCode;
    constructor(message: string, status: number = 500) {
        super(message)
        this.status = status
    }
}

export default ResponseError