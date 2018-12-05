
// 登录
// import admin from './admin';
const express = require('express')
const app = express();



const admin = require('./admin.js');
const order = require('./order.js');






// 转发
app.use('/admin', admin);
app.use('/order', order);




// 导出 app
module.exports = app;

