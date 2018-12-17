const express = require('express');
const router = express.Router();


const GoodsDetail1 = require('../controller/goodsDetail1');
const goodsDetail1 = new GoodsDetail1();



router.get('/detail1', goodsDetail1.getByGid);


module.exports = router;

