// 登录接口
let jwt = require('jsonwebtoken')
let common = require('../../controller/common.js')
let url = require('url')
let login = require('../../controller/module/login.js')

module.exports = {
    // 登录
    async login(req, res) {
        let email = req.body.email
        let password = req.body.password
        let username = req.body.username

        if (!username) {
            res.json({
                code: '506',
                msg: '请输入用户名!'
            })
        }
        // 判断邮箱格式
        // if (!email && !common.isEmail(email)) {
        //     res.json({
        //         code: 501,
        //         msg: '邮箱格式错误'
        //     })
        //     return false
        // }
        // 验证密码格式
        if (!password && common.isPwd(password)) {
            res.json({
                code: 504,
                msg: '密码格式错误'
            })
        }

        // 数据库查找邮箱和密码
        let isUser = await login.login([username, password])
        if (isUser) {
            // 获取token
            // sign(加密数据,加密密钥,token存储时间) 加密用户名
            let token = jwt.sign({ username, username }, 'ckj', {
                // token有效时间为15分钟
                expiresIn: 60 * 60 * 1
            })
            res.json({
                code: 0,
                data: {
                    token
                },
                info: {
                    name: isUser.name
                },
                msg: '登录成功'
            })
        }
        else {
            res.json({
                code: 511,
                msg: '用户名或者密码不正确'
            })
        }

    },
    // 验证登录
    async verifyLogn(req, res) {
        // 验证token
        let token = req.body.token || req.headers.token
        jwt.verify(token, 'ckj', function (err, result) {
            if (err) {
                res.json({
                    code: 512,
                    msg: '登录失效',
                    type: 'warning'
                })
            } else {
                res.json({
                    code: 0,
                    msg: 'ok'
                })
            }
        })
    },

    // 退出登录
    async loginUOut(req, res) {
        let pwd = req.body.pwd
        let isregister = await login.isPwd(pwd)
        if (!isregister) {
            res.json({
                code: 0,
                msg: '退出登录'
            })
        } else {
            res.json({
                code: 513,
                msg: '未登录'
            })
        }
    },

    // 注册
    async register(req, res) {
        let params = req.body
        // let data = req.query.data
        // data = JSON.parse(data)
        // 验证邮箱
        if (!params.email && !common.isEmail(params.email)) {
            res.json({
                code: 502,
                msg: '邮箱格式不正确'
            })
            return false;
        }
        // 判断数据库是否已存在pwd
        let ispwd = await login.isPwd(params.pwd)
        if (!ispwd) {
            res.json({
                code: 505,
                msg: '用户已注册'
            })
            return false
        }
        // 注册
        let register = await login.register([params.email, params.pwd, params.role])
        if (register) {
            res.json({
                code: 0,
                msg: '注册成功'
            })
            return false
        }
        else {
            res.json({
                code: '507',
                msg: '!'
            })
        }

    },

    // 获取列表数据
    async getList(req, res) {
        let list = await data.List()
        if (list) {
            res.json({
                code: 0,
                msg: 'ok',
                data: list
            })
        }
    },
    // 删除数据
    async delUser(req, res) {
        let id = url.parse(req.url, true).query.id
        let result = await data.deleteuser(id)
        if (result) {
            res.json({
                code: 0,
                data: '删除成功'
            })
        }
    },

    // 修改数据渲染信息
    async update(req, res) {
        let id = url.parse(req.url, true).query.id
        let result = await data.upinfo(id)
        if (result) {
            res.json({
                code: 0,
                data: result
            })
        }
    },
    // 修改
    async updateInfo(req, res) {
        let params = req.body

        let result = await data.upInfo([params.name, params.pwd, params.email, params.id])
        if (result) {
            res.json({
                code: 0,
                data: result
            })
        }
    },

    // 搜索查询
    async search(req, res) {
        let value = url.parse(req.url, true).query.value
        let result = await data.searchsql(value)
        if (result) {
            res.json({
                code: 0,
                data: result
            })
        }
    },
}