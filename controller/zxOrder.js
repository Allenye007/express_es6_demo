// 引包
const Sequelize = require('sequelize');

const ZxOrderModel = require('../models/ZxOrder').Class;

const sequelizeInstance = require('../config/config.db').sequelize;  // 引配置

// 每个订单的Item数组
const ZxOrderItemModel = require('../models/ZxOrderItem');  // 导出用的 module.exports = ZxOrderItem;  不用加 .Class



// 关联数据表
ZxOrderModel.hasMany(ZxOrderItemModel, {foreignKey: 'index', sourceKey:'id', as: 'item'});

/*
笔记
1.在一个User.hasOne(Project)形式的调用中，正在调用的模型User是源模型而做为参数被传入的Project模型是目标模型。

BelongsTo - 属于
2.BelongsTo关联表示一对一关系的外键存在于 《源模型》。
    Player.belongsTo(Team); // 会为Player添加一个teamId 属性以保持与Team 主键的关系
    默认情况下，一个属于关系的外键将从目标模型的名称和主键名称生成。
3.在定义中使用as命名时，会将其做为目标模型的名称：
    User.belongsTo(UserRole, {as: 'role'}); // 会为 user添加 roleId 属性而不是 userRoleId
4.在任命情况下，使用了foreignKey选项，外键名都会使用此选项值。我可以在Sequelize 中像下面这样使用外键：
    User.belongsTo(Company, {foreignKey: 'fk_company'}); // 为User 添加fk_company 外键
5.目标键是位于目标模型上通过源模型外键列指向的列。默认情况下，目标键是会belongsTo关系中目标模型的主键。要使用自定义列，请用targetKey选项来指定：
    User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // 为User 添加 fk_companyname 目标键

HasOne - 拥有一个
6.HasOne关联表示一对一关系的外键存在于目标模型。
    你同样可以自定义外键，如：你想使用一个已存在数据库:
    Project.hasOne(User, { foreignKey: 'initiator_id' })  外键会存在于users 表中，此项是自定义外键
    Person.hasOne(Person, {as: 'Father', foreignKey: 'DadId'})  会为Person 增加一个 DadId 属性
7.如果想对一个表做两次连接查询:
    Team.hasOne(Game, {as: 'HomeTeam', foreignKey : 'homeTeamId'});
    Team.hasOne(Game, {as: 'AwayTeam', foreignKey : 'awayTeamId'});
8.一对多(One-To-Many)关联
    Project.hasMany(User, {as: 'Workers'})
*/

class ZxOrder {
    constructor() {

    };

    // 根据 手机号 姓名 状态 单号 供应商 下单日期
    async queryList(req, res) {
        // 前端传什么参数，就查什么内容
        try {
            let P = req.query;
            let paramas = {};
            // 用户
            if(P.user_name) {
                paramas.user_name = P.user_name;
            }
            // 状态
            if(P.status) {
                paramas.status = P.status;
            }
            // 供应商
            if(P.op) {
                paramas.op = P.op;
            }
            // 手机号
            if(P.phone) {
                paramas.phone = P.phone;
            }
            // 单号  oid
            if(P.oid) {
                paramas.oid = P.oid;
            }

            // 时间  起始时间  结束时间
            if(P.st && P.eT) {
                paramas.createdAt = {
                    [Sequelize.Op.lte]:new Date(P.et),// 小于等于
                    [Sequelize.Op.gte]:new Date(P.st),// 大于等于
                }
            }
            let data = await ZxOrderModel.findAndCountAll({
                where: paramas,
                offset: Number(P.page) * Number(P.page) || 0, // 限制区域
                limit: Number(P.size) || 50, // 每次请求数量
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: ZxOrderItemModel,
                    as: 'item' ,
                }],
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
    // 模拟事务  发货  把事务写在最后 {transaction: t}
    async sendOrder(req, res) {
        try {
            sequelizeInstance.transaction((async t => {
                    let P = req.query;
                    let data = await ZxOrderModel.findOne({
                        where: {
                            uid: P.uid,
                            oid: P.oid
                        },
                        include: [{
                            model: ZxOrderItemModel,
                            as: 'item'
                        }]
                    });
                    if(data === null) {
                        throw new Error('无此订单');
                    }
                    // 事务
                    data = await ZxOrderItemModel.update(
                    {status: 1}, 
                    {where: {
                            oid: P.oid
                        }
                    }, 
                    {transaction: t});

                    data = await ZxOrderModel.update(
                    {status: '已发货'},
                    {where: {
                            oid: P.oid
                        }
                    }, 
                    {transaction: t});

                    if(data === null) {
                        throw new Error('更新失败')
                    }
                    res.send({
                        code: 0,
                        msg: '发货成功'
                    })
            }))
        } catch(E) {
            res.send({
                code: 1,
                msg: E.message
            })
        }


    }

    async getInfo(req, res) {
        try {
            let data = await ZxOrderModel.findAndCountAll({
                include: [{
                    model: ZxOrderItemModel,
                    as: 'item' ,
                }]
            })
            res.send({
                code: 0,
                msg: data
            })
        } catch (E) {

        }

    }
    
}

exports.Class = ZxOrder;




// app.get('/api/user/profile', function (request, response)
// {
//   var error = new Error();

//   var User = db.User;
//   User.find({
//     where: { emailAddress: request.user.username}
//   }).then(function(user)
//   {
//     if(!user)
//     {
//       error.status = 500; error.message = "ERROR_INVALID_USER"; error.code = 301;
//       return next(error);
//     }

//     profile = {
//       "firstName": user.firstName,
//       "lastName": user.lastName,
//       "emailAddress": user.emailAddress
//     }
//     response.status(200).send(profile);
//   });
// });