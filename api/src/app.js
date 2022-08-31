const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routeProduct = require('./routes/Products');
const routeUser = require('./routes/User');
const routeType = require('./routes/type');
const routerPayment = require('./routes/Payment');
const routeReview = require('./routes/Review');
const routeOrder = require('./routes/Orders');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,auth_token, Content-Type, Accept'
  );

  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/product', routeProduct);
server.use('/user', routeUser);
server.use('/type', routeType);
server.use('/payment', routerPayment);
server.use('/review', routeReview);
server.use('/order', routeOrder);

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
