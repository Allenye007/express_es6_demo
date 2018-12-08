// 引包
const Sequelize = require('sequelize');
// 实例化 sequelize
const sequelizeInstance = require('../config/config.db.js').sequelize;
let orderSchema = {};
let defaultSetUp = {};

orderSchema = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true
    },
    oid:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true
    },
    uid:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true
    },
    tid:{
        type: Sequelize.STRING,// 所属合伙人ID
        allowNull: false,
        defaultValue: '0'// 当前订单所属的推荐人
    },
    iuid:{
        type: Sequelize.STRING,// 所属推荐人ID
        allowNull: false,
        defaultValue: '0'// 默认合伙人指定为爱真选
    },
    vip:{
        type: Sequelize.TINYINT,// 下单人属性
        allowNull: false,
        defaultValue: 0// 默认合伙人指定为爱真选
    },
    status:{
        type: Sequelize.STRING,// 订单状态
        allowNull: false,
        defaultValue: 'INIT'// 默认合伙人指定为爱真选
        // 状态，INIT、PENDING_、DELIVERED_（只有待收货带_，用于把订单分离出来）、SUCCESS、REFUNDING、REFUNDED、RETURNING、RETURNED、RECHANGING、RECHANGED、CANCEL
    },
    op:{
        type: Sequelize.STRING,// 所属供货商
        allowNull: true,
    },
    check:{
        type: Sequelize.STRING,// 该单是否审核通过
        allowNull: false,
        defaultValue: 'ACCESS'// 默认合伙人指定为通过
    },
    total:{
        type: Sequelize.INTEGER,// 订单总价，分
    },
    goods_total:{
        type: Sequelize.INTEGER,// 商品总价，分
    },
    cashback:{
        type: Sequelize.INTEGER,// 商品总佣金，分
    },
    bonus:{
        type: Sequelize.INTEGER,// 商品总分成，分
    },
    coupon_code:{
        type: Sequelize.STRING,// 一单只能有一张优惠券
    },
    coupon_discount:{
        type: Sequelize.INTEGER,// 商品运费折扣，分
    },
    freight:{
        type: Sequelize.INTEGER,// 商品总运费，分
    },
    freight_discount:{
        type: Sequelize.INTEGER,// 商品运费折扣，分
    },
    payment:{
        type: Sequelize.INTEGER,// 应支付总金额，分
    },
    user_balance_consume:{
        type: Sequelize.INTEGER,// 用户余额扣减金额，分
    },
    discount:{
        type: Sequelize.INTEGER,// 折扣总金额，分
    },
    actual_payment:{
        type: Sequelize.INTEGER,// 实付总金额，分
    },
    // 签收情况
    success_time:{
        type: Sequelize.DATE,// 签收时间戳
    },
    success_type:{
        type: Sequelize.TINYINT,// 签收属性，0为自动签收，1为手动主动签收
    },
    // 支付字段
    paidAt:{
        type: Sequelize.DATE,// 支付时间
    },
    pay_oid:{
        type: Sequelize.STRING,// 支付单号
    },
    express_id:{
        type: Sequelize.STRING,// 快递单号
    },
    express_brand:{
        type: Sequelize.STRING,// 快递品牌
    },
    deliveredAt:{
        type: Sequelize.DATE,// 开始配送时间戳
    },
    // 逆向字段
    reverser_id:{
        type: Sequelize.STRING,// 逆向订单关联
    },
    // 用户属性时间戳
    province:{
        type: Sequelize.STRING,// 用户省份
        allowNull: false,
    },
    city:{
        type: Sequelize.STRING,// 用户所在城市
        allowNull: false,
    },
    county:{
        type: Sequelize.STRING,// 用户所在区
        allowNull: false,
    },
    address:{
        type: Sequelize.STRING,// 用户详细地址
        allowNull: false,
    },
    contact:{
        type: Sequelize.STRING,// 支付单号
        allowNull: false,
    },
    phone:{
        type: Sequelize.STRING,// 用户电话号
        allowNull: false,
    },
    // 用户信息
    avatar:{
        type: Sequelize.STRING,// 用户头像信息，非即时
    },
    user_name:{
        type: Sequelize.STRING,// 用户名信息，非即时
    },
};

defaultSetUp = {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
}

const ZxOrder = sequelizeInstance.define('Zx_order', orderSchema, defaultSetUp);    
sequelizeInstance.sync({force: false});
exports.Class = ZxOrder;


// 导入数据库

// const fs = require('fs');
// const path = require('path');
// fs.readFile(path.resolve(__dirname, '../initData/zxOrder.json'), 'utf8', (err, data) => {
//     // console.log(JSON.parse(data).data.Items[0]);
//     ZxOrder.bulkCreate(JSON.parse(data).data.Items)
//     .then((R) => {
//         console.log(R, 1111)
//     })
//     .catch(E => {
//         console.log(E, 2222)
//     })
// })
