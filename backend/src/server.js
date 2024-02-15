require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const { mainErrroHandler, validateJWTToken} = require('./middleware');
const itemsRouter = require('./routes/itemRoutes');
const categoriesRouter = require('./routes/categoryRoutes');
const ordersRouter = require('./routes/ordersRoutes');
const itemRatingRoutes = require('./routes/itemRatingRoutes');


const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
  res.json('Hello World!');
});

// use routers
// /api         /auth/login



app.use('/api', authRouter);
app.use('/api', itemsRouter);
app.use('/api', validateJWTToken, categoriesRouter);
app.use('/api', validateJWTToken, ordersRouter);
app.use('/api', validateJWTToken, itemRatingRoutes);

// 404 not found page api
app.use((req, res) => {
  res.status(404).json({
    error: 'Page not found',
  });
});

// visos musu klaidos
app.use(mainErrroHandler);

app.listen(port, () => {
  console.log(chalk.blue(`Server is listening on port ${port}`));
});
