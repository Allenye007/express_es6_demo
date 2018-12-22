
// 登录
// import admin from './admin';
const express = require('express')
const app = express();



const admin = require('./admin.js');
const order = require('./order.js');
const zxOrder = require('./zxOrder.js');
const zxVendor = require('./zxVendor.js');
const address = require('./address');
const goods1 = require('./goods1');
const goodsDetail1 = require('./goodsDetail1');
const zxStore = require('./zxStore');





// 转发
app.use('/admin', admin);
app.use('/order', order);
app.use('/zxOrder', zxOrder);
app.use('/zxVendor', zxVendor);
app.use('/address', address);
app.use('/goods1', goods1);
app.use('/detail', goodsDetail1);
app.use('/store', zxStore);




// 导出 app
module.exports = app;

