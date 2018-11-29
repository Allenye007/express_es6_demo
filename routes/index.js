
// 登录
// import admin from './admin';
const express = require('express')
const app = express();



const admin = require('./admin.js');






// 转发
app.use('/admin', admin);




// 导出 app
module.exports = app;

