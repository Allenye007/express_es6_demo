
const OrderModel = require('../models/Order');
const sequelizeInstance = require('../config/config.db').sequelize;  // 引配置
const formidable = require('formidable');  // 表单提交
const fs = require('fs');
const xlsx  = require('node-xlsx');
const downloadModel = require('../util/csv'); // 下载模板
class Order {
    constructor() {

    };
    // 获取订单列表
    async getOrderList(req, res) {
        try {
            if(!req.currentUser) {
                throw new Error('无权限，请登录');
            }
            let P = req.query;
            if(P.uid === '') {
                throw new Error('no uid');
            }
            let data = await OrderModel.findAndCountAll({
                where: {
                    uid: P.uid
                }
            })
            if(data === null) {
                throw new Error('没有数据')
            }
            res.send({
                code: 0,
                msg: data
            })
        } catch(E) {
            res.send({
                code: 1,
                msg: E.message
            })
        }
    }
    // 修改订单  事务
    async changeOrder(req, res) {
        let P = req.body;
        sequelizeInstance.transaction(async t => {
            try {
                // 自动提交事务
                // 先找
                let data = await OrderModel.findOne({
                    where: {
                        uid: P.uid,
                    }
                }, {transaction: t})
                if(data === null) {
                    throw new Error('请登录');
                }
                // 后改    
                data = await data.update({
                    cashback: P.cashback
                }, {transaction: t});
                if(data === null) {
                    throw new Error('cashback修改失败');
                }

                data = await data.update({
                    op: P.op
                }, {transaction: t});
                if(data === null) {
                    throw new Error('op修改失败');
                }

                res.send({
                    code: 0,
                    msg: data
                })
            } catch (E) {
                res.send({
                    code: 1,
                    msg: E.message
                })
            }

        })
    }
    // 上传订单
    async uploadOrder(req, res){
        let form = new formidable.IncomingForm();  // 实例化
        form.encoding = 'utf-8';  // 字符集
        form.keepExtensions = true;  // 
        form.maxFieldsSize = 20 * 1024 * 1024;  // 大小
        form.type = true;  // 后缀
        form.maxFields = 20; // 数量

        form.parse(req, (err, fields, files) => {
            if(err) {
                res.send({
                    code: 1,
                    msg: '表单信息错误'
                })
            }
            if(files.file) {
                files.upload = files.file;
            } else {
                files.upload = files[''].File || files[''];
            }
            let extName = files.upload.name;  // 文件名
            extName = extName.substring(extName.lastIndexOf('.')+1, extName.length);  // 后缀名  .doc
            switch (files.upload.type) {
                case 'text/csv':
                    extName = 'cvs'
                    break;
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    extName = 'xlsx';
                    break;
                case 'application/vnd.ms-excel':
                    extName = 'xls';
                    break;
                default:
                    extName = '';
                    break;
            }

            if(extName.length === 0) {
                return res.send({
                    code: 202,
                    msg: '不支持的类型'
                })
            } else {
                let filePath = files.upload.path;
                const workSheetsFromFile = xlsx.parse(filePath);
                res.send({
                    code: 0,
                    msg: workSheetsFromFile[0]
                })
            }
        })
    }

    // 批量修改订单  模拟事务  两次更新
    async changeSomeOrder(req, res) {
        sequelizeInstance.transaction(async t => {
            try {
                let P = req.query;
                let data = await OrderModel.update(
                    {status: 8},
                    {where: {
                        oid: P.oid
                    }},
                    {transaction: t}
                )
                if(data === null) {
                    throw new Error('status修改失败');
                }
                data = await OrderModel.update(
                    {cover: 5},
                    {where: {
                        oid: P.oid
                    }},
                    {transaction: t}
                )
                if(data === null) {
                    throw new Error('cover修改失败');
                }
                data = await OrderModel.findAll({
                    where: {
                        oid: P.oid
                    }
                })

                res.send({
                    code: 0,
                    msg: data
                })
            } catch(E) {
                res.send({
                    code: 1,
                    msg: E.message
                })
            }
        })
    }
    // 下载模板
    async downloadOrderModel(req, res) {

        try {
            let P = req.query;
            let data = await OrderModel.findAll({
                where: {
                    oid: P.oid
                }
            })
            if(data === null) {
                throw new Error('没有找到');
            }
            downloadModel(req, res, data);
            res.send({
                code: 0,
                msg: data
            })
        }catch (E) {
            res.send({
                code: 1,
                msg: E.message
            })
        }
        
    }
}

exports.Class = Order;
