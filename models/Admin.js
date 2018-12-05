
// 登录相关
const Sequelize = require('sequelize');  // 引包
const sequelizeInstance = require('../config/config.db').sequelize;  // 引配置

const Admin = sequelizeInstance.define('users123', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    user_name: {
        type: Sequelize.STRING,
        primaryKey:true
    },
    user_pwd: Sequelize.STRING,
    phone: {
        type: Sequelize.INTEGER,
        defaultValue: '1583000'  // 默认值
    },
    op: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    sale_volume: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // 每天的登录次数
    login_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    login_time: {
        type: Sequelize.STRING, // 登录时间
        defaultValue: 0,
        allowNull: true,  // 允许为空  
    }
    
},
{
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// 同步数据库实例
sequelizeInstance.sync({force: false});

// export default User;
// module.exports = {User};
module.exports = Admin
