const Joi = require('joi');

const modelCreate = require('../../models/products/create');
const modelGetByName = require('../../models/products/getByName');

const isValidName = async (name) => {
  const alreadyExists = await modelGetByName(name);
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

const create = async (name, quantity) => {
  const error = isValidParams(name, quantity);
  if (error) throw error;
  const err = {
      code: 'invalid_data',
      message: '',
  };
  if (await isValidName(name)) err.message = await isValidName(name);
  if (err.message) throw err;
  return modelCreate(name, quantity);
};

module.exports = create;
