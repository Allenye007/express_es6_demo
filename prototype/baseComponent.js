// import formiadable from 'formidable';

// import { error } from 'util';
// import { promises, writeSync } from 'fs';
// import { resolve } from 'dns';
const fs = require('fs');
const path = require('path');
const gm = ('gm')
const fetch = require ('node-fetch');
const idListsModel = require('../models/idLists');

class BaseComponent {
    constructor() {
		this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
    };

    // 分配数据
    async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
        type = type.toLocaleUpperCase();
        resType = resType.toLocaleUpperCase();
        // 请求方式
        if(type === 'GET') {
            let dataStr = '';
            Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
            })
            if(dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
        }
        if(type === 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
        }
        let requestConfig = {
            method: type,
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json'
            }
        }
        let responseJson;
        try {
            const response = await fetch(url, requestConfig);
            if(resType === 'TEXT') {
                responseJson = await response.text();
            } else {
                responseJson = await response.json();
            }
        } catch (err) {
            console.log('获取数据失败');
            throw new error(err);
        }
        return responseJson;
    }
    
    // 获取路径
    async getPath() {
        return new Promise((resolve, reject) => {
            const form = formidable.IncomingForm();
            form.parse(req, (err, fields, files) => {
                let img_id = 'img_id';
                try {
                    img_id = await this.getId(img_id)
                } catch (E) {
                    fs.unlinkSync(files.file.path);
                    reject('获取图片ID失败')
                }

                const hashName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16) + img_id;
                const extName = path.extname(files.file.name);
                if(!['.jpg', '.jpeg', '.png'].includes(extName)) {
                    // 如果不包含后缀名字的
                    res.send({
                        msg: '文件 格式错误'
                    })
                    reject('上传文件失败');
                    return
                }
                const fullName = hashName + extName;
                const rePath = './public/img/' + fullName;
                try {
                    fs.renameSync(files.file.name, rePath);
                    gm(rePath)
                        .resize(200, 200, '!')
                        .write(repath, async (err) => {
                            // if(err){
                            // 	console.log('裁切图片失败');
                            // 	reject('裁切图片失败');
                            // 	return
                            // }
                            resolve(fullName)
                        })
                } catch (E) {
                    if (fs.existsSync(repath)) {
						fs.unlinkSync(repath);
					} else {
						fs.unlinkSync(files.file.path);
					}
					reject('保存图片失败')
                }
            });
        })
    }

    // 获取ID值
    async getId(type) {
        if(!this.idList.includes(type)) {
            throw new Error('id类型错误');
        }
        try {
            const idData = await idListsModel.findOne();
            idData[type] ++ ;
			await idData.save();
			return idData[type]
        } catch (E) {
            throw new Error(E)
        }
    }
    
}

exports.class = BaseComponent;