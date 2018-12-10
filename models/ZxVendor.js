
const Sequelize = require('sequelize');  // 引包
const sequelizeInstance = require('../config/config.db').sequelize;  // 引配置

let schema = {};
let defaultSetUp = {};

schema = {
    index: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: true,
        autoIncrement: true        
    },
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
    },
    status: {
        type: Sequelize.INTEGER,// 0为封禁，1为正常状态
    },
    name: {
        type: Sequelize.STRING, // 名称
        allowNull: false,  // 允许为空  
    },
    credit_code: {
        type: Sequelize.STRING // 统一信用代码证
    },
    tax_type: {
        type: Sequelize.INTEGER, // 0为一般纳税人，1为小规模纳税人，2为个人，3为其他
        defaultValue: 0
    },
    contact: {
        type: Sequelize.STRING // 联系人
    },
    phone: {
        type: Sequelize.STRING, // 电话
    },
    email: {
        type: Sequelize.STRING // 联系邮箱
    },
    address: {
        type: Sequelize.STRING // 地址
    },
    bank_name: {
        type: Sequelize.STRING // 开户行名称
    },
    bank_id: {
        type: Sequelize.STRING // 银行账号
    },
    // pic: {
    //     Sequelize.array(),// 资质列表，全图片
    // }
    bg_passport_email: {
        type: Sequelize.STRING // 后台管理系统email账号
    },
    remark: {
        type: Sequelize.STRING // 备注
    }
}

defaultSetUp = {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
}

// 定义模板
const ZxVendor = sequelizeInstance.define('Zx_vendor', schema, defaultSetUp);

sequelizeInstance.sync({force: false}); // 同步数据库

module.exports = ZxVendor

// const fs = require('fs');
// const path = require('path');

// fs.readFile(path.resolve(__dirname, '../initData/vendor.json'), 'utf-8', (err, data) => {
    
//     ZxVendor.bulkCreate(JSON.parse(data).data.Items)
//         .then(R => {
//             console.log(R, 1111)
//         })
//         .catch(E => {
//             console.log(E, 2222)
//         })
// })



