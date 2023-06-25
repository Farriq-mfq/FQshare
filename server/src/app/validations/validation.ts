import { Request } from 'express'
import Joi from 'joi'
import ResponseError from '../errors/response.error'
import HttpStatusCode from '../enums/httpcode.enum'
const validation = <T>(schema: Joi.ObjectSchema, request: Pick<Request, 'body'>): T => {
    const valid = schema.validate(request, { abortEarly: false, allowUnknown: false })
    if (valid.error) {
        const errors: { [key: string]: string }[] = []
        valid.error.details.map(err => errors.push({ [err.path[0]]: err.message }))
        throw new ResponseError(JSON.stringify(errors), HttpStatusCode.BAD_REQUEST_400, "VALIDATION")
    }

    return valid.value as T
}


export default validation