
// 登录相关
const Sequelize = require('sequelize');  // 引包
const sequelizeInstance = require('../config/config.db').sequelize;  // 引配置

const Sku1 = sequelizeInstance.define('Zx_Sku1', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    gid: { // 唯一标识
        type: Sequelize.STRING,
        primaryKey:true,
    },
    sid: { // 唯一标识
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: 0
    },
    bonus: {
        type: Sequelize.INTEGER,
    },
    type_id: {
        type: Sequelize.STRING,
    },
    show: {
        type: Sequelize.BOOLEAN,
    },
    weight: {
        type: Sequelize.INTEGER,
    },
    cashback: {
        type: Sequelize.INTEGER,
    },
    number: {
        type: Sequelize.INTEGER,
    },
    price: {
        type: Sequelize.INTEGER,
    },
    limit: {
        type: Sequelize.INTEGER,
    },
    base_sales: {
        type: Sequelize.INTEGER,
    },
    stock: {
        type: Sequelize.INTEGER,
    },
    sales: {
        type: Sequelize.INTEGER,
    },
    barcode: {
        type: Sequelize.STRING,
    }
    
},
{
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// 同步数据库实例
sequelizeInstance.sync({force: false});

module.exports = Sku1;
