const Sequelize = require('sequelize');
const sequelizeInstance = require('../config/config.db.js').sequelize;


let schema = {};
let defaultSetUp = {};

schema = {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
    }
}


// 模块名
const ZxVenderPicArr = sequelizeInstance.define('Zx_order_Item', schema, defaultSetUp);    
sequelizeInstance.sync({force: false});



module.exports = ZxVenderPicArr;