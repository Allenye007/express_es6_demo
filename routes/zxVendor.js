const express = require('express');
const router = express.Router();



const ZxVendor = require('../controller/zxVendor'); // 导出 controler
const zxVendor = new ZxVendor;  // 实例化


router.get('/list', zxVendor.getList); // 获取列表
router.get('/change', zxVendor.changeVendor); // 启用禁用 vendor







module.exports = router;