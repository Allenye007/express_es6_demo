// 引包
const Sequelize = require('sequelize');
// 实例化 sequelize
const sequelizeInstance = require('../config/config.db.js').sequelize;
let schema = {};
let defaultSetUp = {};
/*
    *字段*

    hashKey: 'gid',
    rangeKey: 'sid',
    timestamps: true,
    schema: {
         spu专属
        gid: Joi.string(),//商品id
        sid: Joi.string(),// 是sku时展现sid，spu时展现0
        name: Joi.string(),//商品名称
        op: Joi.string(),// 发货商，非常重要用于拆单，op直接影响gid
        describe: Joi.string(),//商品描述
         brand_id:Joi.string(),//品牌id
        goods_price: Joi.string(),//商品最低价
        goods_cashback: Joi.number(),//会员返现价
        discount_price: Joi.number(),//划线价
        cid: Joi.array(),//商品3级id
        show: Joi.boolean(),//上下架
        service: Joi.array(),//商品服务
        tag: Joi.array(),//标签

        default_image: Joi.string(),//默认商品展示图
        carousel_image: Joi.array(),//商品详情顶部录轮播
        details_image: Joi.array(),//商品详情图
        rank_image: Joi.array(),// 商品组列表中展现的产品页面

        s_image: Joi.string(),// 好友分享图
        q_image: Joi.string(),// 朋友圈分享图
        share: Joi.string(),// 分享语

        top_price: Joi.number(),//商品详情页展示最高价
        min_price: Joi.number(),//商品详情页展示最低价
        styles: Joi.array(),//商品规格
        skus: Joi.array(),//sku具体信息

        shipping: Joi.array(),// 运费模板
         全国包邮为空，有地方要加价展现如：{"北京市":1.5}

         每一条sku的具体字段
         sid sku_id
         type_id 规格
         price 价格
         discount_price 划线价
         image sku默认图
         number 起售数量
         cashback 佣金
         show sku上下架，增加复杂sku校验逻辑，所有sku全下架则商品下架
         weight 重量，按g
         specification 规格

         limit 新加入，限购数量，0为不限购（默认）

         sales销量，总销量和累计销量
        base_sales: Joi.number(),// sku虚拟库存数量，仅sku有
        sales: Joi.number(),// 只有sku才有，spu是sku的总和
         评论总数
         评论星级，评论回调时更新
        eva_num: Joi.number(),// 评论总数
        eva_stars: Joi.number(),// 评论星总数

        direct: Joi.boolean(),// direct字段设为出，不会在列表中展现

        priority: Joi.number(),// 商品优先级，优先级越高，在列表中展现越靠前，优先级默认为1
        correlation: Joi.array(),//相关商品gid列表
         sku专属
        stock: Joi.number(),
    },
*/
schema = {
    id: {
        type: Sequelize.INTEGER,
        unique: true, // 唯一标识
        primaryKey: true, // 主键
        autoIncrement: true // 自增
    },
    share: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    min_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    top_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    eva_num: {
        type: Sequelize.INTEGER,
    },
    op: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    discount_price: {
        type: Sequelize.INTEGER,
    },
    eva_stars: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    goods_price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priority: {
        type: Sequelize.INTEGER, // 分
        allowNull: false
    },
    direct: {
        type: Sequelize.BOOLEAN, // 分
        allowNull: false
    },
    sid: {
        type: Sequelize.STRING, // 分
        allowNull: false
    },
    q_image: {
        type: Sequelize.STRING,
    },
    goods_cashback: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    default_image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    describe: {
        type: Sequelize.STRING,
        allowNull: false
    },
    show: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    d_sid: {
        type: Sequelize.STRING,
    },
    sku_num: {
        type: Sequelize.INTEGER,
    },
    sales: {
        type: Sequelize.INTEGER,
    },
    base_sales: {
        type: Sequelize.STRING,
    }
}

defaultSetUp = {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false, // 时间戳
    paranoid: true, // 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
}

const GoodsDetail1 = sequelizeInstance.define('zx_GoodsDetail1', schema, defaultSetUp);

// 同步数据库实例
sequelizeInstance.sync({
    force: false
});

module.exports = GoodsDetail1;