const Joi = require('joi');
const modelGetByName = require('../../models/products/getByName');

const isValidName = async (name) => {
  const alreadyExists = await modelGetByName.getByName(name);
  if (alreadyExists) return 'Product already exists';
  return false;
};

const isValidParams = (name, quantity) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  }).validate({ name, quantity });
  return error;
};

module.exports = {
  isValidName,
  isValidParams,
};