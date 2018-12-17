const GoodsDetail1Model = require('../models/GoodsDetail1');

class GoodsDetail1 {
    constructor() {

    };

    async getByGid(req, res) {
        try{
            let P = req.query;

            let data = await GoodsDetail1Model.findOne({
                where: P
            })
            console.log(data)
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
}

module.exports = GoodsDetail1;