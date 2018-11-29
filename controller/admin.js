// 引入模板
// import AdmidModel from '../models/Admin';
const AdmidModel = require('../models/Admin');

// import crypto from 'crypto'
// import formidable from 'formidable'
// import dtime from 'time-formater'

class Admin {
    // 语法
    // lonin() {

    // }
    constructor() {

    }
    async login(req, res) {
        let P = req.body;
        if(!P.name || !P.pwd) {
            return res.send({
                code: 1,
                msg: '请输入完整'
            })
        }
        try {
            let data = await AdmidModel.findOne({
                where: {
                    user_name: P.name
                }
            })
            if(data === null) {
                throw new Error('用户名错误');
            }
            if(data.dataValues.user_pwd !== P.pwd) {
                throw new Error('密码错误');
            }
            res.send({
                code: 0,
                msg: data
            })

        } catch (E) {
            res.send({
                code: 2,
                err_msg:  E.message,
            })
        }
    };

    async registe() {

    };
}



exports.Class = Admin; // 导出实例后，在routes里面就可以直接调用了。


/*语法*/
// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     toString() {
//         return '(' + this.x + ', ' + this.y + ')';
//     }
// }