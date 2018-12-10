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
    uid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true, //  关联主外键
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    contact: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
    },
    remark: {
        type: Sequelize.STRING
    }
}

defaultSetUp = {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
}

const Address = sequelizeInstance.define('zx_address', schema, defaultSetUp);
sequelizeInstance.sync({force: false});


module.exports = Address;

// 导入数据库
// const fs = require('fs');
// const path = require('path');

// fs.readFile(path.resolve(__dirname, '../initData/user.json'), (err, data) => {
//     console.log(JSON.parse(data).data.Items);
//     let resp = JSON.parse(data).data.Items;
//     let arr= [];
//     for(let i = 0; i < resp.length; i++) {
//         let obj = {
//             uid: resp[i].uid,
//             user_name: resp[i].contact,
//             contact: resp[i].contact,
//             phone: resp[i].phone,
//             address: resp[i].province + resp[i].city + resp[i].county + resp[i].address,
//         };
//         arr.push(obj);

//     }
//     Address.bulkCreate(arr)
//         .then(R=> {
//             console.log(R, 111)
//         })
//         .catch(E=> {
//             console.log(E.message)
//         })
// })