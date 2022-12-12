import joi from 'joi';

const gamesSchema = joi.object({
  name: joi.string().required().max(30).min(2),
  image: joi.string().required(),
  stockTotal: joi.number().required().min(1),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().required().min(1)
});

export default gamesSchema;