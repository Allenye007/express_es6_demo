const Sequelize = require('sequelize');
const {host,  config} = require('./config.default');
const sequelize = new Sequelize(config.dbName, config.user, config.pwd, {
    // host: 'localhost',
    host: host,
    dialect: config.dialect,
    pool: {
      max: config.max,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
});

sequelize
  .authenticate()
  .then(()=>{
      console.log('App启动，数据库连接成功');
  })
  .catch(err => {
      console.log(err);
  });

exports.sequelize = sequelize;