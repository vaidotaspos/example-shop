const express = require('express');

const categoriesRouter = express.Router();

const categoriesController = require('../controllers/categoryController');

// routes
// GET /categories
categoriesRouter.get('/categories', categoriesController.getAll);

// POST /categories
categoriesRouter.post('/categories', categoriesController.create);

// GET /categories/:id
categoriesRouter.put('/categories/:id', categoriesController.update);

// GET /categories/:id
categoriesRouter.get('/categories/:id', categoriesController.single);

// DELETE /categories/:id
categoriesRouter.delete('/categories/:id', categoriesController.delete);

module.exports = categoriesRouter;
