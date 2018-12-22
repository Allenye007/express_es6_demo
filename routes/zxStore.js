
const express = require('express');
const router = express.Router();

const {StoreAllModel,StoreInModel,StoreOutModel} = require('../controller/zxStore');

const StoreAll = new StoreAllModel();
const StoreIn = new StoreInModel();
const StoreOut = new StoreOutModel();





// all
router.post('/all/addGoods', StoreAll.allAddOneGoods);
// router.post('/changeOrder', order.changeOrder);


// in
router.post('/in/comeIn', StoreIn.comeIn);



// out
router.post('/out/sendOrder', StoreOut.sendOrder);






module.exports = router;
