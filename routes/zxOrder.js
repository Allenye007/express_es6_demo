const express = require('express');
const router = express.Router();

const ZxOrder = require('../controller/zxOrder').Class;
const zxOrder = new ZxOrder();


router.get('/list', zxOrder.queryList);
router.get('/sendOrder', zxOrder.sendOrder);
router.get('/info', zxOrder.getInfo);













module.exports = router;