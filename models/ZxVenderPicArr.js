const Sequelize = require('sequelize');
const sequelizeInstance = require('../config/config.db.js').sequelize;


let schema = {};
let defaultSetUp = {};

schema = {
    index: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    id: { // 与其他的表的关联
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
    },
    url: {
        type: Sequelize.STRING,
    },
    remark: {
        type: Sequelize.STRING,
    }
}

defaultSetUp = {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
}


// 模块名
const ZxVenderPicArr = sequelizeInstance.define('Zx_vendor_picArr', schema, defaultSetUp);    
sequelizeInstance.sync({force: false});



module.exports = ZxVenderPicArr;


// 下面是把 MongoDB 拆表 成 MySQL
// const fs = require('fs');
// const path = require('path');

// fs.readFile(path.resolve(__dirname, '../initData/vendor.json'), 'utf-8', (err, data) => {

//     var arr = [];
//     for(let i = 0; i  < JSON.parse(data).data.Items.length; i++) {
//         var obj= {};
//         obj.id = JSON.parse(data).data.Items[i].id;
//         obj.picArr = JSON.parse(data).data.Items[i].aptitude;
//         arr.push(obj)
//     }

//     var arr1 = [];
//     for(let i = 0; i < arr.length; i++) {
//         for(let k = 0; k < arr[i].picArr.length; k++) {
//             var obj = {}
//             obj.id = arr[i].id;
//             obj.url = arr[i].picArr[k].url
//             arr1.push(obj);
//         }
//     }
//     ZxVenderPicArr.bulkCreate(arr1)
//         .then(R => {
//             console.log(R, 11111);
//         })
//         .catch(E => {
//             console.log(E, 22222);
//         })
// })