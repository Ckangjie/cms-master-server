let query = require('../mysql.js')
module.exports = {
	// 列表渲染
	articleList: async function (data) {
		let sql = 'select * from article'
		let result = await query(sql, data)

		if (result.length > 0) {

			return result
		}
		return false
	},
	// 添加新闻
	addArticle: async function (data) {
		let sql = 'insert into article(title,author,status,content,img,type) values(?)'
		let result = await query(sql, [data]).catch(function (res) {
			console.log(res)
		})
		return result
	},
	// 编辑文章
	editArticle: async function (data) {
		let sql = 'UPDATE article set title=?,author=?,status=?,content=?,img=?,type=? WHERE id=?'
		let result = await query(sql, data).catch(function (res) {
			console.log(res)
		})
		return result
	},
	// 删除文章
	delArticle: async function (ids) {
		let result = await query("DELETE FROM article WHERE id in (" + ids + ")").catch(function (res) {
			console.log(res)
		})
		return result
	},
	// 搜索文章
	search: async function (value) {
		var sql = ''
		if (value) {
			sql = "select * from article where title like '%" + value + "%' or content like '%" + value + "%'"
		} else {
			sql = 'select * from article'
		}
		let result = await query(sql, value).catch(function (res) {
			console.log(res)
		})
		return result
	},
	// 新闻详情列表渲染
	newsdeatail: async function (data) {
		let sql = 'select * from news where id=?'
		let result = await query(sql, data)

		if (result.length > 0) {

			return result
		}
		return false
	},
	// 搜索新闻
	searchNewsql: async function (value) {
		if (value) {
			let sql = "select * from news where title like '%" + value + "%' or content like '%" + value + "%'"
		} else {
			let sql = 'select * from article'
		}
		//let sql ="SELECT * FROM user WHERE userName LIKE CONCAT('%',?,'%') or CONCAT('?','%')"
		// let sql = "SELECT * FROM news WHERE title LIKE CONCAT('%',?,'%')"
		let result = await query(sql, value).catch(function (res) {
			console.log(res)
		})
		return result
	},
}
