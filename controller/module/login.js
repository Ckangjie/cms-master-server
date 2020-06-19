let query = require('../mysql.js')
module.exports = {
	// 验证用户是否注册
	isPwd: async function (pwd) {
		let data = await query('SELECT * FROM user WHERE pwd = ?', pwd)
		if (data.length > 0) {
			// 注册
			return false
		} else {
			// 未注册
			return true
		}
	},
	// 验证登录信息
	login: async function (data) {
		let sql = 'select * from user where name =? and password = ?'

		let result = await query(sql, data)

		if (result.length > 0) {

			return result[0]
		}
		return false
	},
}
