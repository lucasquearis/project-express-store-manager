const Joi = require('joi');
const serviceCreate = require('../../services/sales/create');

const ERROR_MESSAGE = 'Wrong product ID or invalid quantity';

const create = async (req, res, next) => {
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().required().min(24).rule({ message: ERROR_MESSAGE }),
    quantity: Joi.number().required().min(1).rule({ message: ERROR_MESSAGE })
    .messages({ 'number.base': ERROR_MESSAGE }),
  })).validate(req.body);
  if (error) return next(error);
  const newSale = await serviceCreate(req.body);
  if ('code' in newSale) return next(newSale);
  res.status(200).json(newSale);
};

module.exports = create;