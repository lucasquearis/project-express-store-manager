const express = require('express');
const createController = require('../controllers/products/create');
const listController = require('../controllers/products/list');
const getByIdController = require('../controllers/products/getById');
const updateController = require('../controllers/products/update');
const deleteController = require('../controllers/products/delete');

const productsRouter = express.Router({ mergeParams: true });

productsRouter.post('/', createController.create);
productsRouter.get('/', listController.list);
productsRouter.get('/:id', getByIdController.getById);
productsRouter.put('/:id', updateController.update);
productsRouter.delete('/:id', deleteController.deleteProduct);

module.exports = { productsRouter };
