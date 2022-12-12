import joi from 'joi';

const categoriesSchema = joi.object({
  name: joi.string().required().max(30).min(2),
  
});

export default categoriesSchema;