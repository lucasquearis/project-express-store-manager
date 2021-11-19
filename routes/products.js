const express = require('express');
const createProductController = require('../controllers/products/create');
const listProductController = require('../controllers/products/list');
const getByIdController = require('../controllers/products/getById');
const updateProductController = require('../controllers/products/update');

const productsRouter = express.Router({ mergeParams: true });

productsRouter.post('/', createProductController);
productsRouter.get('/', listProductController);
productsRouter.get('/:id', getByIdController);
productsRouter.put('/:id', updateProductController);

module.exports = productsRouter;
