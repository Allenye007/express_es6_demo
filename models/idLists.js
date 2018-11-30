// 引包
const Sequelize = require('sequelize');
// 实例化 sequelize
const sequelizeInstance = require('../config/config.db.js').sequelize;
let idListsSchema = {};
let defaultSetUp = {};

idListsSchema = {
    id: {
        type: Sequelize.INTEGER,
        unique: true, // 唯一标识
        primaryKey:true, // 主键
        autoIncrement: true  // 自增
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	food_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	order_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	user_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	address_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	cart_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	img_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	category_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	item_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	sku_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    }, 
	admin_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
	statis_id: {
        type: Sequelize.INTEGER,
        unique: true, 
    },
}

defaultSetUp = {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
}

const IdLists = sequelizeInstance.define('idLists', idListsSchema, defaultSetUp);

// 同步数据库实例
sequelizeInstance.sync({force: false});

module.exports = IdLists;