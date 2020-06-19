let common = require('../../controller/common.js')
let goods = require('../../controller/module/good.js')
let url = require('url')
let join = require('path').join
let path = require('path')
let formidable = require('formidable')
let fs = require('fs')

module.exports = {

	// 获取商家列表
	async getShop(req, res) {
		let list = await goods.shopList()
		if (list) {
			res.json({
				data: list,
				status: 200
			})
		}
	},
	// 获取商品列表
	async getGoods(req, res) {
		let type_id = url.parse(req.url, true).query.type_id
		if (req.headers.token) {
			if (common.verifyToken(req.headers.token)) {
				let list = await goods.goodsList(type_id)
				if (list) {
					res.json({
						data: list,
						status: 200
					})
				}
			} else {
				res.json({
					status: 512,
					message: '登录失效',
					type: 'warning'
				})
			}
		} else {
			let list = await goods.goodsList(type_id)
			if (list) {
				res.json({
					data: list,
					status: 200
				})
			}
		}


	},
	// 添加商品
	async addGoods(req, res) {
		let params = req.body
		let paramsList = [params.name, params.details, params.price, params.stock, params.sales, params.url,
		params.goodsType_id
		]
		if (common.verifyToken(req.headers.token)) {
			let list = await goods.Goods(paramsList)
			if (list) {
				res.json({
					status: 200,
					message: '添加成功',
				})
				return false
			}
		} else {
			res.json({
				status: 512,
				message: '登录失效',
				type: 'warning'
			})
		}

	},
	// 编辑商品
	async editGoods(req, res) {
		let params = req.body
		let url = params.url || params.images
		let img = params.editUrl
		if (url != img) {
			common.getJsonFiles("static/img", img)
		}
		let paramsList = [params.name, params.details, params.price, params.stock, params.sales, url,
		params.goodsType_id,
		params.id
		]
		if (common.verifyToken(req.headers.token)) {
			let list = await goods.edit(paramsList)
			if (list) {
				res.json({
					status: 200,
					message: '修改成功',
				})
				// common.getJsonFiles("static/img",url)
				return false
			}
		} else {
			res.json({
				status: 512,
				message: '登录失效',
				type: 'warning'
			})
		}

	},
	// 删除商品
	async delGoods(req, res) {
		let id = url.parse(req.url, true).query.id
		let img = url.parse(req.url, true).query.img
		let result = await goods.del(id)
		if (result) {
			res.json({
				status: 200,
				message: '删除成功'
			})
		}
		// 删除图片
		common.getJsonFiles("static/img", img)
	},
	// 商品图片
	uploadImg(req, res) {
		let form = new formidable.IncomingForm();
		// 保留文件后缀名
		form.keepExtensions = true
		// 存储位置
		form.uploadDir = './static/img'
		form.parse(req, function (err, fields, files) {
			let url = path.basename(files.file.path)
			let name = path.basename(files.file.name)
			if (url) {
				res.json({
					status: 200,
					data: {
						url,
						name
					}
				})
			}
		})
	},
	// 获取商品分类
	async getGoodsType(req, res) {
		if (req.headers.token) {
			if (common.verifyToken(req.headers.token)) {
				let list = await goods.goodsType()
				if (list) {
					res.json({
						data: list,
						status: 200
					})
				}
			} else {
				res.json({
					status: 512,
					message: '登录失效',
					type: 'warning'
				})
			}
		} else {
			let list = await goods.goodsType()
			if (list) {
				res.json({
					data: list,
					status: 200
				})
			}
		}

	},
	// 添加商品分类
	async addGoodsType(req, res) {
		let params = req.body
		if (!params.pid) params.pid = 0
		let paramsList = [params.typeName, params.pid]
		let list = await goods.addType(paramsList)
		if (list) {
			res.json({
				status: 200,
				message: '添加成功',
				data: list
			})
			return false
		}
	},
	// 编辑商品分类
	async editGoodsType(req, res) {
		let params = req.body
		if (!params.pid) params.pid = 0
		let paramsList = [params.typeName, params.pid, params.type_id]
		let list = await goods.editType(paramsList)
		if (list) {
			res.json({
				status: 200,
				message: '修改成功',
			})
			return false
		}
	},
	// 删除商品分类
	async delGoodsType(req, res) {
		let type_id = url.parse(req.url, true).query.type_id
		let result = await goods.delType([type_id, type_id])
		if (result) {
			res.json({
				status: 200,
				message: '删除成功'
			})
		}
	},
	// 前端app
	// 轮播图
	async getBanner(req, res) {
		let result = await goods.banner()
		if (result) {
			res.json({
				status: 200,
				message: 'ok',
				data: result
			})
		}
	},

}
