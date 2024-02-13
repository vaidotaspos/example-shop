const express = require('express');

const ordersRouter = express.Router();
const ordersController = require('../controllers/ordersController');

// GET /api/orders/user/5 - grazintu visus 5to userio orderius

// GET /api/orders/ - grazina visus uzsakymus autorizuotas
ordersRouter.get('/orders', ordersController.getAll);

// POST /api/orders - paduoti visa reikalinga info kad sukurti orderi
ordersRouter.post('/orders', ordersController.create);

module.exports = ordersRouter;
