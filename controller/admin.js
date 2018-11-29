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
    async login(req, res,) {
        let P = req.body;
        console.log(P)
        if(!P.name || !P.pwd) {
            return res.send({
                code: 1,
                msg: '请输入完整'
            })
        }
        try {
            const data = await AdmidModel.findOne({
                where: {
                    user_name: P.name
                }
            })
            console.log(data);

        } catch (E) {
            res.send({
                code: 2,
                err:  E,
                msg: '登录失败'
            })
        }
    }
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