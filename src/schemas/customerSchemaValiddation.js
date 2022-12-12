import joi from 'joi';

const customerSchema = joi.object({
    name: joi.string().required().max(30).min(2),
    phone: joi.string().required().min(10).max(11),
    cpf: joi.string().required().max(11).min(11),
    birthday: joi.string().required(),
});

export default customerSchema;