const {
  StoreAll,
  StoreOut,
  StoreIn
} = require('../models/Zx_store');
const sequelizeInstance = require('../config/config.db').sequelize; // 引配置 事务
const shortid = require('shortid');

/*
    * 一个仓库 对应  很多商品  一个商品对应很多 类型（size）   在一个仓库里  一个size 是唯一的
*/


// 库存
class StoreAllModel {
  constructor() {
    // this.getGid = this.getGid.bind(this)
  }
  // 添加一个商品
  async allAddOneGoods(req, res) {
    let P = req.body;

    try {
      if (!P.c_name) {
        throw new Error('请填写品类名称');
      }
      if (!P.g_name) {
        throw new Error('请填写商品名称');
      }
      if (!P.all_num) {
        throw new Error('请填写数量');
      }
      if (!P.all_unit) {
        throw new Error('请填写商品单元');
      }
      if (!P.all_at) {
        throw new Error('请填写时间');
      }
      if (!P.per_price) {
        throw new Error('请填写商品单价');
      }
      if (!P.all_price) {
        throw new Error('请填写商品总价');
      }
      if (!P.person) {
        throw new Error('请填写负责人');
      }
      if (!P.cid) {
        throw new Error('请填写品类id');
      }
      if (!P.size) {
        throw new Error('请填写商品规格');
      }
      if (Number(P.all_num) * Number(P.per_price) !== Number(P.all_price)) {
        throw new Error('数量、单价和总价填写的不对');
      }
      let data = await StoreAll.findOne({
        where: {
          g_name: P.g_name
        }
      })
      if (!data) {
        // 如果数据中没有 g_name， 就随机 gid
        // this.randomGid(P)
        console.log('随机 gid')
        let option = {
          where: {
            size: `${P.size}(${P.g_name})`,
          },
          defaults: {
            cid: P.cid,
            c_name: P.c_name,
            gid: shortid.generate(), // shortID 随机
            g_name: P.g_name,
            size: `${P.size}(${P.g_name})`, // 唯一标识
            all_num: P.all_num,
            all_unit: P.all_unit,
            all_at: P.all_at,
            per_price: P.per_price,
            all_price: P.all_price,
            person: P.person,
            sid: P.sid,
            s_name: P.s_name,
            all_reason: P.all_reason,
            op:  P.op  // 该商品所属供货商
          }
        }
        data = await StoreAll.findOrCreate(option)
      } else {
        // 获取gid , 使用同一个gid
        // this.getGid(P);
        console.log('获取GID')
        let option = {
          where: {
            size: `${P.size}(${P.g_name})`,
          },
          defaults: {
            cid: P.cid,
            c_name: P.c_name,
            gid: data.dataValues.gid, // 获取gid
            g_name: P.g_name,
            size: `${P.size}(${P.g_name})`,
            all_num: P.all_num,
            all_unit: P.all_unit,
            all_at: P.all_at,
            per_price: P.per_price,
            all_price: P.all_price,
            person: P.person,
            sid: P.sid,
            s_name: P.s_name,
            all_reason: P.all_reason,
            op:  P.op  // 该商品所属供货商
          }
        }
        data = await StoreAll.findOrCreate(option)
      }
      if (!data) {
        throw new Error('品类存在')
      }
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



// 出库
class StoreOutModel {
  async sendOrder(req, res) {
    let P = req.body;
    try {
      try {
        if (!P.cid) {
          throw new Error('请填写参数1');
        }
        if (!P.c_name) {
          throw new Error('请填写参数2');
        }
        if (!P.g_name) {
          throw new Error('请填写参数4');
        }
        if (!P.size) {
          throw new Error('请填写参数5');
        }
        if (!P.out_num) {
          throw new Error('请填写参数6');
        }
        if (!P.out_unit) {
          throw new Error('请填写参数7');
        }
        if (!P.out_at) {
          throw new Error('请填写参数8');
        }
        if (!P.per_price) {
          throw new Error('请填写参数9');
        }
        if (!P.all_price) {
          throw new Error('请填写参数10');
        }
        if (!P.person) {
          throw new Error('请填写参数11');
        }
        if (!P.customer) {
          throw new Error('请填写参数12');
        }
        if (!P.pay_monery) {
          throw new Error('请填写参数13');
        }
        if (!P.no_pay_monery) {
          throw new Error('请填写参数14');
        }
        if (!P.ticket) {
          throw new Error('请填写参数15');
        }
        if (!P.mark) {
          throw new Error('请填写参数16');
        }
        if (Number(P.out_num) * Number(P.per_price) !== Number(P.all_price)) {
          throw new Error('数量、单价和总价填写的不对');
        }
      } catch (E) {
        res.send({
          code: 2,
          msg: E.message
        })
      }

      let data = await StoreAll.findOne({
        where: {
          size: P.size  // 都在这里 判断也行
        }
      })
      if (!data) {
        throw new Error("出库失败，该商品没有在库存中备注")
      }

      if (data.dataValues.cid !== P.cid) {
        throw new Error('您填写的出库资料不正确1')

      }
      if (data.dataValues.c_name !== P.c_name) {
        throw new Error('您填写的出库资料不正确2')

      }
      if (data.dataValues.g_name !== P.g_name) {
        throw new Error('您填写的出库资料不正确3')

      }
      if (data.dataValues.size !== P.size) {
        throw new Error('您填写的出库资料不正确4')

      }
      // if (data.dataValues.all_unit !== P.out_unit) {
      //   throw new Error('您填写的出库资料不正确5')
      // }
      if(Number(P.out_num) * Number(P.per_price) !== Number(P.all_price)) {
        throw new Error('出库商品数量、单价、总价不相符');
      }
      if(Number(P.pay_monery) + Number(P.no_pay_monery) !== Number(P.all_price)) {
        throw new Error('付款和尾款不相符');
      }
      // (卖价-进价) * 数量
      let earn = Number(P.per_price - data.dataValues.per_price) * P.out_num // 该次出库的利润

      // 事务 创建 出库表 并 更新库存表
      let transaction = await sequelizeInstance.transaction();
      try  {
        // 在出库表创建出库信息
         let data1 = StoreOut.create({
          cid: P.cid,
          c_name: P.c_name,
          gid: data.dataValues.gid, // 获取gid
          g_name: P.g_name,
          size: P.size, // 唯一标识
          out_num: P.out_num,
          out_unit: P.out_unit,
          out_at: P.out_at,
          per_price: P.per_price,
          all_price: P.all_price,
          person: P.person,
          customer: P.customer,
          earn, // 该次出库的利润
          pay_monery: P.pay_monery,
          no_pay_monery: P.no_pay_monery,
          ticket: P.ticket,
          mark: P.mark,
          sid: P.sid,
          s_name: P.s_name,
          out_reason: P.out_reason
        }, transaction)

        if (!data1) {
          throw new Error('出库失败1');
        }
        
        // 剩余库存总数 = 原库存总数 - 出库数
        let all_num = Number(data.dataValues.all_num) - Number(P.out_num);

        let per_price = Number(data.dataValues.per_price);
        let all_price = all_num * per_price;

        data = await StoreAll.update({
          all_num,
          all_price,
          per_price
        }, {
          where: {
            size: P.size // 520#(彩釉)
          }
        }, transaction)

        if (!data) {
          throw new Error('出库失败2');
        }

        res.send({
          code: 0,
          msg: '出库成功'
        })
      } catch (E) {
        // await transaction.rollback();
        res.send({
          code: 3,
          msg: E.message
        })
      }

    } catch (E) {
      res.send({
        code: 1,
        msg: E.message
      })
      await transaction.rollback();
    }
  }
}


// 入库
class StoreInModel {
  async comeIn(req, res) {

    let P = req.body;
    if( !P.sid &&
        !P.s_name &&
        !P.cid &&
        !P.c_name &&
        !P.gid &&
        !P.g_name &&
        !P.size &&
        !P.in_num &&
        !P.in_unit &&
        !P.in_at &&
        !P.per_price &&
        !P.all_price &&
        !P.person &&
        !P.op &&
        !P.pay_monery &&
        !P.no_pay_monery &&
        !P.ticket &&
        !P.mark &&
        !P.in_reason 
    ) {
      throw new Error('请填写参数')
    }

    let size = `${P.size}(${P.g_name})` // 编辑的 size
    let data = await StoreAll.findOne({
      where: {
        sid: P.sid,
        cid: P.cid,
        gid: P.gid,
        size
      }
    })

    // return res.send({
    //   msg: data
    // })

    // return res.send({
    //   msg: data
    // })

    // 事务
    let transaction = await sequelizeInstance.transaction();
    try {
      // 判断金额
      // 单价*数量 = 总价
      if(Number(P.per_price) * Number(P.in_num) !== Number(P.all_price)) {
        throw new Error('单价数量总价不相符');
      }
      if(Number(P.pay_monery) + Number(P.no_pay_monery) !== Number(P.all_price)) {
        throw new Error('已付款、尾款、总价不相符');
      }

      if(Number(P.in_reason) === 1) {
        // 正常原因
        if(!data) {
          console.log('!!!!!!')
          // 判断 gid 是否存在
          // if(data.dataValues.gid === P.gid) {
          //   // 添加的入库商品名已存在  共用同一个gid  更新库存表数据

          //   // 更改库存表  改 数量、总价
          //   // 更新的数量
          //   var all_num = P.in_num + data.dataValues.all_num; // 更新为的数量 = 入库数量 + 原有数量
          //   // 更新的总价
          //   var all_price_1 = all_num * data.dataValues.per_price; // 总价 = 单价 * 总数量
          //   // 更改库存表
          //   await StoreAll.update({
          //     all_num: all_num,
          //     all_price: all_price_1
          //   }, {
          //     where: {
          //       gid: P.gid
          //     }
          //   }, {transaction});
  
          //   // 向入库表中添加数据
          //   var option2 = {
          //     id: P.id,
          //     sid: P.sid,
          //     s_name: P.s_name,
          //     cid: P.cid,
          //     c_name: P.c_name,
          //     gid: data.dataValues.gid,  //  新建商品 用之前的gid  -----
          //     g_name: P.g_name,
          //     size: `${P.g_name}(${P.size})`,
          //     in_num: P.in_num,
          //     in_unit: P.in_unit,
          //     in_at: P.in_at,
          //     per_price: P.per_price, // 单价
          //     all_price: P.all_price, // 总价
          //     person: P.person,
          //     op: P.op,
          //     pay_monery: P.pay_monery, // 已付款
          //     no_pay_monery: P.no_pay_monery, // 尾款
          //     ticket: P.ticket,
          //     mark: P.mark,
          //     in_reason: P.in_reason,
          //   }
          //   // 入库表
          //   data = await StoreIn.create(option2, {transaction});
          //   res.send({
          //     code: 0,
          //     status: 'ok',
          //     msg: data
          //   })
          // } else {
            // 新增一个商品  随机一个gid  在库存表中新曾数据  在入库表中新曾数据
    
            var option = {
              id: P.id,
              sid: P.sid,
              s_name: P.s_name,
              cid: P.cid,
              c_name: P.c_name,
              gid: shortid.generate(),  // 随机gid
              g_name: P.g_name,
              size: `${P.g_name}(${P.size})`, // g_name + size
              all_num: P.all_num,
              all_unit: P.all_unit,
              all_at: P.all_at,
              per_price: P.per_price,
              all_price: P.all_price,
              person: P.person,
              mark: P.mark,
              all_reason: P.all_reason,
              op:  P.op  // 该商品所属供货商          
            }
            // 库存表
            await StoreAll.create(option, {transaction});
  
            var option2 = {
              id: P.id,
              sid: P.sid,
              s_name: P.s_name,
              cid: P.cid,
              c_name: P.c_name,
              gid: shortid.generate(),  //  新建商品 随机gid
              g_name: P.g_name,
              size: `${P.g_name}(${P.size})`,
              in_num: P.in_num,
              in_unit: P.in_unit,
              in_at: P.in_at,
              per_price: P.per_price,
              all_price: P.all_price,
              person: P.person,
              op: P.op,
              pay_monery: P.pay_monery,
              no_pay_monery: P.no_pay_monery,
              ticket: P.ticket,
              mark: P.mark,
              in_reason: P.in_reason,
            }
            // 入库表
            data = await StoreI.create(option2, {transaction});
            res.send({
              code: 0,
              msg: data
            })
          // }
        } else {
          // 有数据 -> update库存表    create入库表      
          
          // 更改库存表  改 数量、总价
          // 更新的数量
          var all_num = Number(P.in_num) + (data.dataValues.all_num); // 更新为的数量 = 入库数量 + 原有数量
          // 更新的总价
          var all_price_all = Number(all_num) * Number(data.dataValues.per_price); // 总价 = 单价 * 总数量
          
          // var option1 = {
          //   all_num: all_num,
          //   all_price: all_price_all
          // }
          // 更改库存表
          await StoreAll.update({
            all_num: all_num,
            all_price: all_price_all
          },{
            where: {
              size: `${P.size}(${P.g_name})`
            }
          }, {transaction});


          // 向入库表中添加数据
          var option2 = {
            id: P.id,
            sid: P.sid,
            s_name: P.s_name,
            cid: P.cid,
            c_name: P.c_name,
            gid: data.dataValues.gid,  //  新建商品 用之前的gid  -----
            g_name: P.g_name,
            size: `${P.g_name}(${P.size})`,
            in_num: P.in_num,
            in_unit: P.in_unit,
            in_at: P.in_at,
            per_price: P.per_price, // 单价
            all_price: P.all_price, // 总价
            person: P.person,
            op: P.op,
            pay_monery: P.pay_monery, // 已付款
            no_pay_monery: P.no_pay_monery, // 尾款
            ticket: P.ticket,
            mark: P.mark,
            in_reason: P.in_reason,
          }
          // 入库表
          await StoreIn.create(option2, {transaction});
          res.send({
            code: 0,
            msg: data
          })
        }


      } else {
        // 其他原因
        console.log(222222)
      }
      await transaction.commit();
    } catch(E) {
      res.send({
        code: 1,
        msg: E.message
      })
      // 回滚
      await transaction.rollback();
    }
  }
}


module.exports = {
  StoreAllModel,
  StoreInModel,
  StoreOutModel
}