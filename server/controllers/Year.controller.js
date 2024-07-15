const { YearModel } = require('../models/models')
const ApiError = require('../error/errorHandler');

class YearController {
    async getOne(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badReq('Не задан id'))
        }

        const type = await YearModel.findOne({ where: { id: id } })

        if (type !== null) {
            return res.json(type)
        } else {
            return next(ApiError.forbidden("Модель не найдена"))
        }
    }

    async getAll(req, res, next) {
        const type = await YearModel.findAll()

        return res.json(type)
    }

    async create(req, res, next) {
        const { years, modelId } = req.body;

        const type = await YearModel.create({ years, modelId })

        return res.json(type)
    }

    async update(req, res, next) {
        const { id } = req.body
        const { model, motoId, disabled } = req.body

        if (!id) return next(ApiError.badReq('Не задан id Модели'))

        if (!model && disabled === undefined) return next(ApiError.badReq('Не задано имя либо статус'))

        const type = await YearModel.update({ model, motoId, disabled }, { where: { id: id } })


        if (type[0] === 1) {
            return res.status(200).json({ message: 'Обновление Модели ' + id + ' прошло успешно' })
        } else {
            return res.status(404).json({ message: 'Модель ' + id + ' не найдено' })
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query

            const type = await YearModel.destroy({ where: { id: id } })

            if (type === 1) {
                return res.status(200).json({ message: 'Удаление Модели ' + id + ' прошло успешно' })
            } else {
                return res.status(404).json({ message: 'Модель ' + id + ' не найдена' })
            }
        } catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'Произошла ошибка сервера при удалении записи.' });
        }
    }
}

module.exports = new YearController;