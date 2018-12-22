const GoodsDetail1Model = require('../models/GoodsDetail1');
const Sku1Model = require('../models/Sku1');

// 每个商品的SKU
GoodsDetail1Model.hasMany(Sku1Model, {foreignKey: 'gid', sourceKey:'gid', as: 'skus'});

class GoodsDetail1 {
    constructor() {

    };

    async getByGid(req, res) {
        try{
            let P = req.query;

            let data = await GoodsDetail1Model.findOne({
                where: P,
                include: [{
                    model: Sku1Model,
                    as: 'skus' ,
                }],
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