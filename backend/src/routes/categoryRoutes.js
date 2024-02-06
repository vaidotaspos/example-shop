const express = require('express');

const categoriesRouter = express.Router();

const categoriesController = require('../controllers/categoryController');

// routes
// GET /categories
categoriesRouter.get('/categories', categoriesController.getAll);

module.exports = categoriesRouter;
