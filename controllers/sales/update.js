const Joi = require('joi');
const getByIdService = require('../../services/sales/getById');
const updateService = require('../../services/sales/update');

const ERROR_MESSAGE = 'Wrong product ID or invalid quantity';

const update = async (req, res, next) => {
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().required().min(24).rule({ message: ERROR_MESSAGE }),
    quantity: Joi.number().required().min(1).rule({ message: ERROR_MESSAGE })
    .messages({ 'number.base': ERROR_MESSAGE }),
  })).validate(req.body);
  if (error) return next(error);
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  const verifyExist = await getByIdService(id);
  const updateSale = await updateService(productId, quantity, id);
  if ('err' in verifyExist) return next(verifyExist.err);
  if ('err' in updateSale) return next(updateSale.err);
  res.status(200).json(updateSale);
};

module.exports = update;