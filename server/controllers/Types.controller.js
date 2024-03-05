const { Type } = require('../models/models')
const ApiError = require('../error/errorHandler')

class TypesController {
    async getOne(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badReq('Не задан id'))
        }

        const type = await Type.findOne({ where: { id: id } })

        if (type !== null) {
            return res.json(type)
        } else {
            return next(ApiError.forbidden("Деталь не найдена"))
        }
    }

    async update(req, res, next) {
        const { id } = req.body
        const { name } = req.body
        const { disabled } = req.body

        if (!id) return next(ApiError.badReq('Не задан id детали'))

        if (!name && disabled === undefined) return next(ApiError.badReq('Не задано имя либо статус'))

        const type = await Type.update({ name: name, disabled: disabled }, { where: { id: id } })

        if (type[0] === 1) {
            return res.status(200).json({ message: 'Обновление типа детали ' + id + ' прошло успешно' })
        } else {
            return res.status(404).json({ message: 'Тип детали ' + id + ' не найдено' })
        }
    }

    async getAll(req, res, next) {
        const type = await Type.findAll()

        return res.json(type)
    }

    async create(req, res) {
        const { name } = req.body;

        const type = await Type.create({ name: name })

        return res.json(type)
    }

    async delete(req, res) {
        try {
            const { id } = req.query

            const type = await Type.destroy({ where: { id: id } })

            if (type === 1) {
                return res.status(200).json({ message: 'Удаление типа детали ' + id + ' прошло успешно' })
            } else {
                return res.status(404).json({ message: 'Тип детали ' + id + ' не найдено' })
            }
        } catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'Произошла ошибка сервера при удалении записи.' });
        }

    }
}

module.exports = new TypesController();