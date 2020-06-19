let express = require('express')
let router = require('./router/router')
let bodyParser = require('body-parser')

let app = express()

let urlencoded = bodyParser.urlencoded({
	extended: false
})

// 接收数据大小
app.use(bodyParser.json({ limit: "2100000kb" }));
// 静态服务器
// 图片
app.use(express.static('./static/img'))
// 跨域
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Method', 'get, post, put')
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next()
})

// 登录
app.post('/login', urlencoded, router.login)
// 验证登录
app.post('/verifylogin', urlencoded, router.verifyLogn)
// 文章列表
app.get('/articleList', router.articleList)
//添加文章
app.post('/addArticle', urlencoded, router.addArticle)
// 编辑文章
app.post('/editArticle', urlencoded, router.editArticle)
// 删除文章
app.post('/delArticle', urlencoded, router.delArticle)
// 文章搜索
app.get('/search', router.search)
// 图片上传
app.post('/upload', urlencoded, router.upload)

app.listen(3000)
