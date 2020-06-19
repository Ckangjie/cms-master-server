let query =require('../mysql.js')
module.exports = {
	// 列表渲染
	newsList: async function(data) {
		let sql = 'select * from news'
		let result = await query(sql, data)

		if (result.length > 0) {

			return result
		}
		return false
	},
	// 注册新闻
	registerNews: async function(data) {
		let sql = 'insert into news(title,content) values(?)'
		let result = await query(sql, [data]).catch(function(res) {
			console.log(res)
		})
		return result
	},
	// 新闻详情列表渲染
	newsdeatail: async function(data) {
		let sql = 'select * from news where id=?'
		let result = await query(sql, data)

		if (result.length > 0) {

			return result
		}
		return false
	},
	// 搜索新闻
	searchNewsql: async function(value) {
		let sql = "select * from news where title like '%" + value + "%' or content like '%" + value + "%'"
		//let sql ="SELECT * FROM user WHERE userName LIKE CONCAT('%',?,'%') or CONCAT('?','%')"
		// let sql = "SELECT * FROM news WHERE title LIKE CONCAT('%',?,'%')"
		let result = await query(sql, value).catch(function(res) {
			console.log(res)
		})
		return result
	},
}
