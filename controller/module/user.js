let query = require('../mysql.js')
module.exports = {
	// 列表渲染
	List: async function (data) {
		let sql = 'select * from user'
		let result = await query(sql, data)

		if (result.length > 0) {

			return result
		}
		return false
	},
	// 删除
	deleteuser: async function (id) {
		let result = await query('DELETE FROM user WHERE id=?', id).catch(function (res) {
			console.log(res)
		})
		return true
	},
	// 查询修改信息
	upinfo: async function (id) {
		let result = await query('SELECT * FROM user WHERE id=?', id).catch(function (res) {
			console.log(res)
		})
		return result
	},

	// 修改信息
	upInfo: async function (data) {
		let sql = "UPDATE user set userName=?,pwd=?,email=? WHERE id=?"
		let result = await query(sql, data).catch(function (res) {
			console.log(res)
		})
		return result
	},
	// 搜索用户
	searchsql: async function (value) {
		// let sql ="SELECT * FROM user WHERE userName LIKE CONCAT('%',?,'%') or CONCAT('?','%')"
		// 'select * from user where username like "%'+value+'%"'
		let sql = "SELECT * FROM user WHERE userName LIKE CONCAT('%',?,'%')"
		let result = await query(sql, value).catch(function (res) {
			console.log(res)
		})
		return result
	},

	// 用户地址
	address: async function () {
		let sql = 'select * from address'
		let result = await query(sql)
		if (result) {
			return result
		}
	},
	// 添加地址
	add: async function (data) {
		if (Number(data[6]) === 1) {
			let sql = "update address set status =0 where status=1"
			let result = await query(sql)
			if (result) {
				this.insert(data)
				return true
			}
		} else {
			this.insert(data)
			return true
		}

	},
	insert: async function (data) {
		let sql = 'insert into address(name,ephone,province,city,county,detailed,status) values(?,?,?,?,?,?,?)'
		let result = await query(sql, data)
		if (result) {
			return true
		}
	},
	update: async function (data) {
		let sql = 'UPDATE address set name=?,ephone=?,province=?,city=?,county=?,detailed=?,status=? WHERE id=?'
		let result = await query(sql, data)
		if (result) {
			return true
		}
	},

	// 编辑地址
	edit: async function (data) {
		if (Number(data[6]) === 1) {
			let sql = "update address set status =0 where status=1"
			let result = await query(sql)
			if (result) {
				this.update(data)
				return true
			}
		} else {
			this.update(data)
			return true
		}
	},
	// 删除地址
	del: async function (id) {
		let sql = 'DELETE FROM address WHERE id=?'
		let result = await query(sql, id).catch(err => {
			console.log(err)
		})
		if (result) {
			return true
		}
	}
}
