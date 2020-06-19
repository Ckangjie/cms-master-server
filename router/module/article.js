// 注册接口
let common = require('../../controller/common.js')
let article = require('../../controller/module/article')
let formidable = require('formidable')
let path = require('path')
let url = require('url')

module.exports = {
    // 添加文章
    async addArticle(req, res) {
        let params = req.body
        let data = [params.title, params.author, params.status, params.content, params.img, params.type]
        let result = await article.addArticle(data)
        if (result) {
            res.json({
                code: 0,
                msg: '添加成功',
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
    // 编辑文章
    async editArticle(req, res) {
        let params = req.body
        let data = [params.title, params.author, params.status, params.content, params.img, params.type, params.id]
        let result = await article.editArticle(data)
        if (result) {
            res.json({
                code: 0,
                msg: '修改成功',
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
    // 删除文章
    async delArticle(req, res) {
        let ids = JSON.parse(req.body.ids)
        let result = await article.delArticle(ids)
        if (result) {
            res.json({
                code: 0,
                msg: '删除成功'
            })
        }
    },
    // 文章搜索
    async search(req, res) {
        let key = url.parse(req.url, true).query.key
        let result = await article.search(key)
        if (result) {
            res.json({
                code: 0,
                data: result
            })
        }
    },
    // 获取新闻详情列表数据
    async getnewsdeatail(req, res) {
        let id = url.parse(req.url, true).query.id
        let list = await data.newsdeatail(id)
        if (list) {
            res.json({
                code: 0,
                msg: 'ok',
                data: list
            })
        }
    },
    // 搜索查询
    async searchNews(req, res) {
        let params = req.query.data
        params = JSON.parse(params)
        let result = await data.searchNewsql(params.value)
        if (result) {
            res.json({
                code: 0,
                data: result
            })
        }
    },
    // 获取文章列表数据
    async articleList(req, res) {
        let list = await article.articleList()
        if (list) {
            res.json({
                code: 0,
                data: list
            })
        } else {
            res.json({
                code: 1,
                data: [],
                msg: '暂无数据'
            })
        }
    },

    // upload
    async upload(req, res) {
        let form = new formidable.IncomingForm();
        // 保留文件后缀名
        form.keepExtensions = true
        // 存储位置
        form.uploadDir = './static/img'
        form.parse(req, function (err, fields, files) {
            let url = path.basename(files.file.path)
            if (url) {
                res.json({
                    code: 0,
                    msg: 'ok',
                    data: {
                        url
                    }
                })
            }
        })
    }
}