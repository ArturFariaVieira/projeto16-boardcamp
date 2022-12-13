import joi from 'joi';

const customerSchema = joi.object({
    name: joi.string().required().max(30).min(2),
    phone: joi.string().required().min(10).max(11).regex(/^[0-9]*$/),
    cpf: joi.string().required().max(11).min(11).regex(/^[0-9]*$/),
    birthday: joi.string().required(),
});

export default customerSchema;