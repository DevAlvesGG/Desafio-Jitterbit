const orderController = require('./controller/orderController');
const express = require('express');
const routes = express.Router();

routes.get('/order/list', orderController.allOrder);
routes.get('/order/:id', orderController.showOrder);
routes.post('/order', orderController.createOrder);
routes.put('/order/:id', orderController.update);
routes.delete('/order/:id', orderController.delete);

module.exports = routes;