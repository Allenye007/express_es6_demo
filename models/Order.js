// 引包
const Sequelize = require('sequelize');
// 实例化 sequelize
const sequelizeInstance = require('../config/config.db.js').sequelize;
let orderSchema = {};
let defaultSetUp = {};

orderSchema = {
    id: {
        type: Sequelize.INTEGER,
        unique: true, // 唯一标识
        primaryKey:true, // 主键
        autoIncrement: true  // 自增
    },
    oid:{
        type: Sequelize.STRING,
        allowNull: false,
        // references: {
        //     model: Order,
        //     key: 'oid'
        // },
    },
    uid: {
        type: Sequelize.STRING,
        allowNull: false
        // 该购买记录，所属的用户
        // 索引，作为符合主键索引
    },
    op:{
        type:Sequelize.STRING,
        allowNull: false
    },
    sid:{
        type:Sequelize.STRING,
        allowNull: false
    },
    barcode:{
        type:Sequelize.STRING,
        // 条形码，可以为空
    },
    spu_id:{
        type:Sequelize.STRING,
        allowNull: false
    },
    spu_name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    sku_name:{
        type:Sequelize.STRING,
    },
    cover:{
        type:Sequelize.STRING,
        allowNull: false
    },
    num:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    unit_price:{
        type:Sequelize.INTEGER,// 分
        allowNull: false
    },
    cashback:{
        type:Sequelize.INTEGER,// 分
        allowNull: false
    },
    freight:{
        type:Sequelize.INTEGER,// 分
        allowNull: false
    },
    cashback_type: {
        type: Sequelize.TINYINT,
        // 0，为佣金直减，1，为佣金兑付，与用户状态直接相关
    },
    bonus:{
        type:Sequelize.INTEGER,// 分
        allowNull: false
    },
    status:{
        type:Sequelize.TINYINT,// -1未支付,0，是已支付，1是异常，2是局部异常，3是签收
        allowNull: false
    },
    r_num:{
        type:Sequelize.INTEGER,// 可用于逆向状态的商品数量，初始化时等于0
        allowNull: false
    },
    tid: {
        type: Sequelize.STRING,
        allowNull: false
        // 该购买记录，购买时所处的店铺id，自主进入系统时为0
        // 索引用于记录佣金机制
    },
    iuid: {
        type: Sequelize.STRING,
        // 该购买记录，所属的推荐人
    },
    eva_status: {
        type: Sequelize.TINYINT,
        // 0，未评价，1，已评价
        // 索引，用于获取评价与待评价列表
    },
    comment_id: {
        type: Sequelize.STRING,
        // 对应评价ID
    },
}

defaultSetUp = {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
}

const Order = sequelizeInstance.define('order', orderSchema, defaultSetUp);

// 同步数据库实例
sequelizeInstance.sync({force: false});

module.exports = Order;

