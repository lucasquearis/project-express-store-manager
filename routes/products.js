const express = require('express');
const createProductController = require('../controllers/products/create');

const productsRouter = express.Router({ mergeParams: true });

productsRouter.post('/', createProductController);

module.exports = productsRouter;
