const express = require('express');

const itemsRouter = express.Router();
const itemsController = require('../controllers/itemsController');
const {validateJWTToken} = require("../middleware");

// routes

// GET all /api/items
itemsRouter.get('/items', itemsController.getAll);

// GET all /api/items/1
itemsRouter.get('/items/:itemId', itemsController.getSingle);

// POST /api/items - create
itemsRouter.post('/items', validateJWTToken, itemsController.create);

// DELETE /api/items - create
itemsRouter.delete('/items/:itemId', validateJWTToken, itemsController.delete);

module.exports = itemsRouter;
