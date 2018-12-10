// 引入模板
const AdmidModel = require('../models/Admin');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// import crypto from 'crypto'
// import formidable from 'formidable'
// import dtime from 'time-formater'

class Admin {
    // 语法
    // lonin() {

    // }
    constructor() {

    };
    
    // 登录
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
                    uid: P.name
                }
            })
            if(data === null) {
                throw new Error('用户名错误');
            }
            if(data.dataValues.user_pwd !== P.pwd) {
                throw new Error('密码错误');
            }
            /*设置token*/
            // var token = jwt.sign({ foo: 'bar' }, '密码', '时间');
            let md5 = crypto.createHash('md5');
            md5.update(P.pwd);
            let secret = 'allen';
            const token = jwt.sign({
                uid: P.name,
                user_pwd: P.pwd,
                vip: data.dataValues.vip
            }, secret, {
                expiresIn: 7200 // 秒
            })
            /*设置token*/
            res.send({
                code: 0,
                token: token,
                msg: data
            })

        } catch (E) {
            res.send({
                code: 2,
                err_msg:  E.message,
            })
        }
    };

    // 重置密码
    async changePwd(req, res) {

        // if(!req.currentUser) {
        //     return res.send({
        //         code: 1,
        //         msg: '无权限，请登录'
        //     })
        // }

        let P = req.body;

        try {
            let data = await AdmidModel.findOne({
                where: {
                    uid: P.name,
                }
            });
            // 判断用户名
            if(data === null) {
                throw new Error('用户名不正确');
            }
            // 判断原密码
            if(P.pwd !== data.dataValues.user_pwd) {
                throw new Error('原密码不正确');
            }
            // 判断原密码与新密码
            if(P.pwd === P.new_pwd) {
                throw new Error('原密码与新密码相同，请更换新密码')
            };

            // 改密码
            data = await data.update({
                user_pwd : P.new_pwd,
            })

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

    // 注册
    async registe(req, res) {
        
        try {

            let P = req.body;
            
            if(!P.name || !P.pwd) {
                throw new Error('请输入完整');
            }

            let data = await AdmidModel.findOne({
                where: {
                    uid: P.name
                }
            })

            if(data !== null) {
                throw new Error('用户名被占用')
            }

            data = await AdmidModel.create({
                uid: P.name,
                user_pwd: P.pwd,
                phone: P.phone
            })

            res.send({
                code: 0,
                msg: data
            })

        }catch (E) {
            res.send({
                code: 1,
                msg: E.message
            })
        }
        
    };

}



exports.Class = Admin;


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