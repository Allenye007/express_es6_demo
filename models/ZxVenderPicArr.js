const Sequelize = require('sequelize');
const sequelizeInstance = require('../config/config.db.js').sequelize;


let schema = {};
let defaultSetUp = {};

schema = {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
    },
    ui: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING,
    }
}


// 模块名
const ZxVenderPicArr = sequelizeInstance.define('Zx_order_Item', schema, defaultSetUp);    
sequelizeInstance.sync({force: false});



// module.exports = ZxVenderPicArr;

const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, '../initData/vendor.json'), 'utf-8', (err, data) => {
    // var len1 = JSON.parse(data).data.Items.length;
    // var len2 = JSON.parse(data).data.Items[i].aptitude.length;
    // console.log(JSON.parse(data).data.Items[1].aptitude);
    var arr = [];
    var obj= {};
    for(var i = 0; i < 29; i++) {
    
        if(JSON.parse(data).data.Items[i].aptitude === undefined || JSON.parse(data).data.Items[i].aptitude <= 0) {

        } else {
            for(var k = 0; k < JSON.parse(data).data.Items[i].aptitude.length; k++) {
                // arr.push(JSON.parse(data).data.Items[i].aptitude[k].url)
                obj.url = JSON.parse(data).data.Items[i].aptitude[k].url;
                obj.id = JSON.parse(data).data.Items[i].id;
                arr.push(obj);
            }
        }
        console.log(arr);
    }
})