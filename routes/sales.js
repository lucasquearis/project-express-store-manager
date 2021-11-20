const express = require('express');
const createController = require('../controllers/sales/create');

const salesRouter = express.Router({ mergeParams: true });

salesRouter.post('/', createController);

module.exports = salesRouter;