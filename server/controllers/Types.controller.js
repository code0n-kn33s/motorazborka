const {Type} = require('../models/models')
const ApiError = require('../error/errorHandler')

class TypesController {
    async getOne (req, res) {
        const { id } = req.query

        if(!id) {
            return next(ApiError.badReq('Не задан id'))
        }

        console.log('id :>> ', id);
        const type = await Type.findOne({where: {id: id}})

        return req.json(type)
        // res.status(200).json({messg: "types is working!", query: id})
    }
    async update (req, res) {
        const { id } = req.query
        const {name} = req.query

        if(!id || !newName) {
            return next(ApiError.badReq('Не задан id либо name'))
        }

        const type = await Type.update({name: name}, {where: {id: id}})

        return req.json(type)
    }
    async getAll (req, res, next) {
        const type = await Type.findAll()

        return res.json(type)
    }
    async create (req, res) {
            const { name } = req.body;
            console.log('>> req.body', req.body)
            const type = await Type.create({name: name})

            return res.json(type)
    }

    async delete (req, res) {
        const {id} = req.query

        const type = await Type.destroy({where: { id: id}})

        return res.json('Удаление ' + id + 'прошло успешно')
        // res.status(200).json({messg: "is working!"})
    }
}

module.exports = new TypesController();