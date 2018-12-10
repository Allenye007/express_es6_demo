const AddressModel = require('../models/Address.js');


class Address {
    constructor() {

    };
    // 获取该用户地址列表
    async getUserList(req, res) {
        try {
            let P = req.query;

            let data = await AddressModel.findAndCountAll({
                where: P
            })
            if (!data) {
                throw new Error('您还没有输入');
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
    }

    // 用户添加一个地址
    async addOneAddress(req, res) {
        try {
            let P = req.query;
            // 假设用户都传上了
            let data = await AddressModel.findOne({
                where: {
                    uid: P.uid
                }
            })

            if(!data) {
                throw new Error('没有找到您的信息，请登录！')
            }
            // console.log(data.dataValues.user_name);
            data = await AddressModel.create({
                uid: P.uid,
                user_name: data.dataValues.user_name,
                contact: P.contact,
                phone: P.phone,
                address: P.address
            })
            res.send({
                code: 1,
                msg: data
            })
        } catch(E) {
            res.send({
                code: 1,
                msg: E.message
            })
        }


    }

    //用户删除一个地址
    async deleteAddress(req, res) {
        try {
            let P = req.query;
            // 假设用户传值
            let data = await AddressModel.findOne({
                where: P
            })
            if(!data) {
                throw new Error('删除错误！')
            }
            data = await AddressModel.destroy({
                where: {
                    uid: P.uid,
                    id: P.id
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
    }
}

module.exports = Address;
