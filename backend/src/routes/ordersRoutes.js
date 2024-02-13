const express = require('express');

const ordersRouter = express.Router();
const ordersController = require('../controllers/ordersController');

// GET /api/orders/:id - grazina uzsakymą pagal nurodyta jo ID
ordersRouter.get('/orders/:id', ordersController.getSingle);


// GET /api/orders/ - grazina visus uzsakymus autorizuotas
ordersRouter.get('/orders', ordersController.getAll);

// POST /api/orders - paduoti visa reikalinga info kad sukurti orderi
ordersRouter.post('/orders', ordersController.create);

// DELETE /api/orders/:id - ištrina užsakyma pagal nurodyta ID
ordersRouter.delete('/orders/:id', ordersController.delete);

module.exports = ordersRouter;
