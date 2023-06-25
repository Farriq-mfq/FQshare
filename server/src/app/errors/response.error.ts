import HttpStatusCode from "../enums/httpcode.enum";
class ResponseError extends Error {
    public status: HttpStatusCode;
    public context?: string;
    constructor(message: string, status: number = 500, context?: string) {
        super(message)
        this.status = status
        this.context = context
    }
}

export default ResponseError