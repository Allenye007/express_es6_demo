
// 登录相关
const Sequelize = require('sequelize');  // 引包
const sequelizeInstance = require('../config/config.db').sequelize;  // 引配置

const Admin = sequelizeInstance.define('Zx_user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    uid: { // 唯一标识
        type: Sequelize.STRING,
        primaryKey:true,
    },
    vip: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    user_name: {
        type: Sequelize.STRING,
    },
    user_pwd: {
        type: Sequelize.STRING,
        defaultValue: '123'  // 默认值
    },
    phone: {
        type: Sequelize.STRING,
        defaultValue: '1583000'  // 默认值
    },
    address: {
        type: Sequelize.STRING,
        defaultValue: '1583000'  // 默认值
    },
    sale_volume: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // 每天的登录次数
    login_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    login_time: {
        type: Sequelize.STRING, // 登录时间
        defaultValue: 0,
        allowNull: true,  // 允许为空  
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

module.exports = Admin;

// 导入数据库

// const fs = require('fs');
// const path = require('path');
// fs.readFile(path.resolve(__dirname, '../initData/user.json'), 'utf8', (err, data) => {
//     let arr = [];
//     var resp = JSON.parse(data).data.Items;
//     for(let i = 0; i < resp.length; i++) {
//         var obj = {};
//         obj.uid = resp[i].uid;
//         obj.vip = resp[i].vip;
//         obj.user_name = resp[i].contact;
//         obj.phone = resp[i].phone;
//         obj.address = resp[i].address;
//         arr.push(obj)
//     }
//     Admin.bulkCreate(arr)
//     .then((R) => {
//         console.log(R, 1111)
//     })
//     .catch(E => {
//         console.log(E, 2222)
//     })
// })
