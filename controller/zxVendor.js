// 引包
const ZxVendorModel = require('../models/ZxVendor');
const ZxVenderPicArrModel = require('../models/ZxVenderPicArr');
const sequelizeInstance = require('../config/config.db').sequelize;  // 引配置

// 关联数据表
ZxVendorModel.hasMany(ZxVenderPicArrModel, {foreignKey: 'id', sourceKey: 'id', as: 'picArr'})

class ZxVendor {
    constructor() {

    }

    // 获取 vendor 列表
    async getList(req, res) {
        try {
            let data = await ZxVendorModel.findAndCountAll({
                include: [{
                    model: ZxVenderPicArrModel,
                    as: 'picArr'
                }]
            })
            if(data === null) {
                throw new Error('无数据');
            }
            res.send({
                code: 0,
                msg: data
            })
        } catch (E) {
            console.log(E);
            res.send({
                code: 1,
                msg: E.message
            })
        }
    }
    // 改变供应商 禁用 启用  模拟事务
    async changeVendor(req, res) {
        sequelizeInstance.transaction( async t => {
            try {
                let P = req.query;
                let data = await ZxVendorModel.findOne({
                    where: P,
                    include: [{
                        model: ZxVenderPicArrModel,
                        as: 'picArr'
                    }]
                })
                if(!data) {
                    throw new Error('请输入正确的关键字');
                }
                
                // 1为启用0为禁用
                console.log(data.dataValues.status, '00000000')
                if(data.dataValues.status === 1) {
                    console.log(1)
                    // 改为2  禁用
                    data = await ZxVendorModel.update({
                        remark: P.remark,
                        status: 0
                    },{
                        where:{
                            id:  P.id
                        }
                    }, {
                        transaction: t
                    });
                } else if(data.dataValues.status === 0) {
                    console.log(2)
                    // 改为1 启用
                    data = await ZxVendorModel.update({
                        remark: P.remark,
                        status: 1
                    },{
                        where:{
                            id:  P.id
                        }
                    }, {
                        transaction: t
                    });
                }

                data = await ZxVenderPicArrModel.update({
                    remark: P.remark
                }, {
                    where: {
                        id: P.id
                    }
                }, {
                    transaction: t
                });
                
                if(!data) {
                    return res.send({
                        code: 11,
                        msg: '请输入正确的关键字'
                    })
                }
                res.send({
                    code: 0,
                    msg: '修改成功'
                })
            }catch(E) {
                console.log(E);
                res.send({
                    code: 1,
                    msg: E.message
                })
            }
        })
    }
}

module.exports = ZxVendor