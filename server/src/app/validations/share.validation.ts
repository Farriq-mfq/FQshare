import Joi from "joi";

const ShareValidation = Joi.object({
    password: Joi.string().min(5).message('password must be at least 5 characters long').optional()
})

const SharePasswordValidation = Joi.object({
    password: Joi.string().required(),
})

export {
    ShareValidation,
    SharePasswordValidation
}