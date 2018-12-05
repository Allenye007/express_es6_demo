
const express = require('express');
const router = express.Router();

const Order = require('../controller/order').Class;
const order = new Order();






router.get('/list', order.getOrderList);
router.post('/changeOrder', order.changeOrder);
router.post('/upload', order.uploadOrder);
router.get('/changeSomeOrder', order.changeSomeOrder);
router.get('/download', order.downloadOrderModel);







module.exports = router;
