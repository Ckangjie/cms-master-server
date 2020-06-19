// 注册接口
let common = require('../../controller/common.js')
let url = require('url')

module.exports ={
    // 注册
    async registerNews(req,res){
        let params=req.query.data
        params =JSON.parse(params)
        // 注册
        let register =await data.registerNews([params.title,params.txt])
        if(register){
            res.json({
                status:200,
                message:'注册成功',
                data:register
            })
            return false
        }
        else{
            res.json({
                status:'507',
                message:'!'
            })
        }
      
    },
      // 获取新闻详情列表数据
      async getnewsdeatail(req, res) {
        let id = url.parse(req.url,true).query.id
        let list = await data.newsdeatail(id)
        if (list) {
            res.json({
                status: 200,
                message: 'ok',
                data: list
            })
        }
    },
	// 搜索查询
	async searchNews(req,res){
        let params=req.query.data
        params =JSON.parse(params)
	    let result  = await data.searchNewsql(params.value)
	    if(result){
	        res.json({
	            status:200,
	            data:result
	        })
	    }
	},
	// 获取新闻列表数据
	async getNews(req, res) {
	    let list = await data.newsList()
	    if (list) {
	        res.json({
	            status: 200,
	            message: 'ok',
	            data: list
	        })
	    }
	},
}