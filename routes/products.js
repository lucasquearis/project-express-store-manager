const express = require('express');
const createController = require('../controllers/products/create');
const listController = require('../controllers/products/list');
const getByIdController = require('../controllers/products/getById');
const updateController = require('../controllers/products/update');
const deleteController = require('../controllers/products/delete');

const productsRouter = express.Router({ mergeParams: true });

productsRouter.post('/', createController);
productsRouter.get('/', listController);
productsRouter.get('/:id', getByIdController);
productsRouter.put('/:id', updateController);
productsRouter.delete('/:id', deleteController);

module.exports = productsRouter;
