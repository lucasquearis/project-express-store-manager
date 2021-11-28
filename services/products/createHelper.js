const Joi = require('joi');
const modelGetByName = require('../../models/products/getByName');

const isValidName = async (name) => {
  const alreadyExists = await modelGetByName.getByName(name);
  if (alreadyExists) return 'Product already exists';
  return false;
};

const isValidParams = (name, quantity) => {
  const { error } = Joi.object({
    name: Joi.string().required().min(5),
    quantity: Joi.number().required().min(1),
  }).validate({ name, quantity });
  return error;
};

module.exports = {
  isValidName,
  isValidParams,
};
