const express = require('express');
const createController = require('../controllers/sales/create');
const listController = require('../controllers/sales/list');
const getByIdController = require('../controllers/sales/getById');
const updateController = require('../controllers/sales/update');

const salesRouter = express.Router({ mergeParams: true });

salesRouter.post('/', createController);
salesRouter.get('/', listController);
salesRouter.get('/:id', getByIdController);
salesRouter.put('/:id', updateController);

module.exports = salesRouter;