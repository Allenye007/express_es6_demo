const Sequelize = require('sequelize');  // 引包
const sequelizeInstance = require('../config/config.db').sequelize;  // 引配置

let schema = {};
let defaultSetUp = {};


schema = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true
    },
    gid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true, //  关联主外键
    },
    op: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    goods_cashback: {
        type: Sequelize.INTEGER,
    },
    goods_price: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    default_image: {
        type: Sequelize.STRING,
    },
    describe: {
        type: Sequelize.STRING
    },
    priority: {
        type: Sequelize.INTEGER
    },
    min_price: {
        type: Sequelize.INTEGER
    },
    top_price: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    show: {
        type: Sequelize.BOOLEAN
    }
}

defaultSetUp = {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
}

const Goods1 = sequelizeInstance.define('goods1', schema, defaultSetUp);
sequelizeInstance.sync({force: false});


module.exports = Goods1;

// 导入数据库
// const fs = require('fs');
// const path = require('path');

// fs.readFile(path.resolve(__dirname, '../initData/goods1.json'), (err, data) => {
//     Goods1.bulkCreate(JSON.parse(data).Items)
//         .then(R=> {
//             console.log(R, 111)
//         })
//         .catch(E=> {
//             console.log(E.message)
//         })
// })