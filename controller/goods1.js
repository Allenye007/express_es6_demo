const Goods1Model = require('../models/Goods1');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


class Goods1 {
    async getList(req, res) {
        try {
            let data = await Goods1Model.findAndCountAll();
            // console.log(data)
            if(!data) {
                throw new Error('没有数据');
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
    // 查寻
    async getSearchByDescribe(req, res) {
        try {
            let P = req.query;
            let data = await Goods1Model.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + P.describe + '%'
                    }
                }
            });
            // console.log(data)
            if(!data) {
                throw new Error('没有数据');
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
    
    async getKeyWorld() {
        try {
            let P = req.query;
            let data = await  Goods1Model.find

        } catch (E) {
            res.send({
                code: 1,
                msg: E.message
            })
        }
    }

}

module.exports = Goods1