const express = require('express');

const itemsRouter = express.Router();
const itemsController = require('../controllers/itemsController');
const {validateJWTToken} = require("../middleware");

const multer = require('multer');


// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname.split('.').shift() + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

const upload = multer({ storage: storage });

// routes

// GET all /api/items
itemsRouter.get('/items', itemsController.getAll);

// GET all /api/items/1
itemsRouter.get('/items/:itemId', itemsController.getSingle);

// PTU update /api/items/1
itemsRouter.put('/items/:itemId',  upload.single('file'), validateJWTToken, itemsController.update);

// PUT /api/items/1/rating
itemsRouter.put('/items/:itemId/rating', validateJWTToken, itemsController.updateRating);

// POST /api/items - create
itemsRouter.post('/items', upload.single('file'), validateJWTToken, itemsController.create);

// DELETE /api/items - create
itemsRouter.delete('/items/:itemId', validateJWTToken, itemsController.delete);

module.exports = itemsRouter;
