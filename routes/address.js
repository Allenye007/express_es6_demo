const express = require('express');
const router = express.Router();

const Address = require('../controller/address');
const address = new Address();


router.get('/list', address.getUserList); // 获取用户的地址列表
router.get('/add', address.addOneAddress); // 用户添加一个地址
router.get('/delete', address.deleteAddress); // 用户添加一个地址






module.exports = router;