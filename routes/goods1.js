const express = require('express')
const router = express.Router();

const Goods1 = require('../controller/goods1');
const goods1 = new Goods1();

router.get('/list', goods1.getList); // 获取用户的地址列表
router.get('/search', goods1.getSearchByDescribe); // 获取用户的地址列表



module.exports = router;