// 接口汇总
let login = require('./module/login')
let news = require('./module/news')
let goods = require('./module/goods.js')
let user = require('./module/user.js')
let article = require('./module/article')

// assign 合并对象
let obj = Object.assign({}, login, news, goods, user, article)

module.exports = obj