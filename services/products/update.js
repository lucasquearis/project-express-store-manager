const Joi = require('joi');
const modelGetByName = require('../../models/products/getByName');
const modelUpdate = require('../../models/products/update');

const isValidName = async (name) => {
  const alreadyExists = await modelGetByName(name);
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

const update = async (name, quantity, id) => {
  const error = isValidParams(name, quantity);
  if (error) throw error;
  const err = {
    code: 'invalid_data',
    message: '',
  };
  if (await isValidName(name)) err.message = await isValidName(name);
  if (err.message) throw err;
  const resultFormat = {
    _id: id,
    name,
    quantity,
  };
  if (await modelUpdate(name, quantity, id)) return resultFormat;
};

module.exports = update;