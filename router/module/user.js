let user = require('../../controller/module/user')
const { del } = require('../../controller/module/good')
module.exports = {
    // 获取地址列表
    async getAddress(req, res) {
        let result = await user.address()
        if (result) {
            res.json({
                status: 200,
                data: result
            })
        }
    },
    // 添加地址
    async add(req, res) {
        let params = req.body
        let data = [params.name, params.ephone,params.province, params.city, params.county, params.detailed,params.status]
        let result = await user.add(data)
        if (result) {
            res.json({
                status: 200,
                message:'添加成功'
            })
        }
    },
    // 编辑地址
    async edit(req,res){
        let params = req.body
        let data = [params.name, params.ephone,params.province, params.city, params.county, params.detailed,params.status,params.id]
        let result = await user.edit(data)
        if(result){
            res.json({
                status:200,
                message:'修改成功'
            })
        }
    },
    // 删除地址
    async del(req,res){
        let result = await user.del(req.body.id)
        if(result){
            res.json({
                status:200,
                message:'删除成功'
            })
        }
    }
}