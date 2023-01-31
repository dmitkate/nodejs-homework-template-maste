const Joi = require("joi");

const validSchemaPost = Joi.object({
  name: Joi.string().min(1).max(40).required(),
  email: Joi.string().min(5).email().required(),
  phone: Joi.number().min(1).integer().required(),
  favorite: Joi.boolean(),
});


const validSchemaPut = Joi.object({
  name: Joi.string().min(1).max(40),
  email: Joi.string().min(5).email(),
  phone: Joi.number().min(1).integer(),
  favorite: Joi.boolean(),
}).min(1);

const validSchemaPatch = Joi.object({
  favorite: Joi.boolean().required(),
});

const validSchemaPostUser = Joi.object({
  email: Joi.string().min(5).email().required(),
  password: Joi.number().min(4).integer().required(), 
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string()
});

module.exports = {
    validSchemaPost,
    validSchemaPut, 
    validSchemaPatch,
    validSchemaPostUser
};