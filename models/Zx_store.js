
// 登录相关
const Sequelize = require('sequelize');
const sequelizeInstance = require('../config/config.db').sequelize;

// 入库表
const StoreIn = sequelizeInstance.define('Zx_store_in', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    sid: { // 仓库ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    s_name: { // 仓库名
        type: Sequelize.STRING,
    },
    cid: { // 品类ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    c_name: { // 品类名称
        type: Sequelize.STRING,
    },
    gid: { // 商品ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    g_name: { // 商品名
        type: Sequelize.STRING,
    },
    size: { // 规格
        type: Sequelize.STRING,
    },
    in_num: { // 入库数量
        type: Sequelize.INTEGER,
    },
    in_unit: { // 商品单位  // 箱 个 条
        type: Sequelize.STRING,
    },
    in_at: { // 入库时间
        type: Sequelize.DATE,
    },
    per_price: { // 入库单价
        type: Sequelize.INTEGER,
    },
    all_price: { // 入库总价
        type: Sequelize.INTEGER,
    },
    person: { // 负责人
        type: Sequelize.STRING,
    },
    op: { // 供应商
        type: Sequelize.STRING,
    },
    pay_monery: { // 付款
        type: Sequelize.INTEGER,
    },
    no_pay_monery: { // 未支付
        type: Sequelize.INTEGER,
    },
    ticket: { // 单号 
        type: Sequelize.STRING,
    },
    mark: {
        type: Sequelize.STRING,
    },
    in_reason: {
        type: Sequelize.INTEGER,
        defaultValue: 1  // 默认值         1 正常入库 0 其他
    }
},
{
    freezeTableName: true, 
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
// 出库表
const StoreOut = sequelizeInstance.define('Zx_store_out', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    sid: { // 仓库ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    s_name: { // 仓库名
        type: Sequelize.STRING,
    },
    cid: { // 品类ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    c_name: { // 品类名称
        type: Sequelize.STRING,
    },
    gid: { // 商品ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    g_name: { // 商品名
        type: Sequelize.STRING,
    },
    size: { // 规格
        type: Sequelize.STRING,
        defaultValue: 0
    },
    out_num: { // 出库数量
        type: Sequelize.INTEGER,
    },
    out_unit: { // 商品单位  // 箱 个 条
        type: Sequelize.STRING,
    },
    out_at: { // 出库时间
        type: Sequelize.DATE,
    },
    per_price: { // 出库单价
        type: Sequelize.INTEGER,
    },
    all_price: { // 出库总价
        type: Sequelize.INTEGER,
    },
    person: { // 出库负责人
        type: Sequelize.STRING,
    },
    customer: { // 客户
        type: Sequelize.STRING,
    },
    earn: { // 该次出货的利润
        type: Sequelize.STRING,
    },
    pay_monery: { // 付款
        type: Sequelize.INTEGER,
    },
    no_pay_monery: { // 未支付
        type: Sequelize.INTEGER,
    },
    ticket: { // 单号 
        type: Sequelize.STRING,
    },
    mark: {
        type: Sequelize.STRING,
    },
    out_reason: {
        type: Sequelize.INTEGER,
        defaultValue: 1  // 默认值         1 正常入库 0 其他
    }
},
{
    freezeTableName: true, 
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
// 库存表
const StoreAll = sequelizeInstance.define('Zx_store_all', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    sid: { // 仓库ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    s_name: { // 仓库名
        type: Sequelize.STRING,
    },
    cid: { // 品类ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    c_name: { // 品类名称
        type: Sequelize.STRING,
    },
    gid: { // 商品ID
        type: Sequelize.STRING,
        primaryKey:true,
    },
    g_name: { // 商品名
        type: Sequelize.STRING,
    },
    size: { // 规格
        type: Sequelize.STRING,
        defaultValue: 0
    },
    all_num: { // 库存数量
        type: Sequelize.INTEGER,
    },
    all_unit: { // 商品单位  // 箱 个 条
        type: Sequelize.STRING,
    },
    all_at: { // 时间
        type: Sequelize.DATE,
    },
    per_price: { // 库存单价
        type: Sequelize.INTEGER,
    },
    all_price: { // 库存总价
        type: Sequelize.INTEGER,
    },
    person: { // 库存负责人
        type: Sequelize.STRING,
    },
    op: { // 供货商
        type: Sequelize.STRING,
    },
    // customer: { // 客户
    //     type: Sequelize.INTEGER,
    // },
    // pay_monery: { // 付款
    //     type: Sequelize.INTEGER,
    // },
    // no_pay_monery: { // 未支付
    //     type: Sequelize.INTEGER,
    // },
    // ticket: { // 单号 
    //     type: Sequelize.STRING,
    // },
    mark: {
        type: Sequelize.STRING,
    },
    all_reason: {
        type: Sequelize.INTEGER,
        defaultValue: 1  // 默认值         1 正常入库 0 其他
    }
},
{
    freezeTableName: true, 
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// 同步数据库实例
sequelizeInstance.sync({force: false});

module.exports = {
    StoreAll,
    StoreOut,
    StoreIn
};
