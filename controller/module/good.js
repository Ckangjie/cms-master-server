let query = require('../mysql.js')
module.exports = {
	// 商品列表
	goodsList: async function(type_id) {
		if (type_id) {
			let sql = "SELECT * FROM goods WHERE goodsType_id = ?"
			let result = await query(sql, type_id)
			if (result) {
				return result
			}
			return false
		} else {
			let sql = "select * from goods INNER JOIN goodstype on goods.goodsType_id=goodstype.type_id"
			let result = await query(sql)
			if (result) {
				return result
			}
			return false
		}
	},
	// 添加商品
	Goods: async function(data) {
		if (data) {
			let sql = 'insert into goods(name,details,price,stock,sales,images,goodsType_id) values(?)'
			let result = await query(sql, [data]).catch(function(res) {
				console.log(res)
			})
			return result
		}
		return false
	},
	// 编辑商品
	edit: async function(data) {
		let sql = 'UPDATE goods set name=?,details=?,price=?,stock=?,sales=?,images=?,goodsType_id=? WHERE id=?'
		let result = await query(sql, data).catch(function(res) {
			console.log(res)
		})
		return result
	},
	// 删除商品
	del: async function(id) {
		let result = await query('DELETE FROM goods WHERE id=?', id).catch(function(res) {
			console.log(res)
		})
		return result
	},
	// 商品分类列表
	goodsType: async function() {
		let sql = "select * from goodstype"
		let result = await query(sql)
		if (result) {
			return result
		}
		return false
	},
	// 添加商品分类
	addType: async function(data) {
		let sql = 'insert into goodstype(typeName,pid) values(?)'
		let result = await query(sql, [data]).catch(function(res) {
			console.log(res)
		})
		return result
	},
	// 编辑商品分类
	editType: async function(data) {
		let sql = 'UPDATE goodstype set typeName=?,pid =? WHERE type_id=?'
		let result = await query(sql, data).catch(function(res) {
			console.log(res)
		})
		return result
	},
	// 删除商品分类
	delType: async function(data) {
		let result = await query('DELETE FROM goodstype WHERE type_id =? OR pid=?', data).catch(function(res) {
			console.log(res)
		})
		return result
	},
	//轮播图
	banner: async function(){
		let sql = 'select * from banner'
		let result = await query(sql)
		if(result){
			return result
		}
	}
}
