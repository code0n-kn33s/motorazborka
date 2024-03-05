const { Moto } = require('../models/models')
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/errorHandler');

class MotoController {
    async getOne(req, res) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badReq('Не задан id'))
        }

        const data = await Moto.findOne({ where: { id: id } })

        console.log('data :>> ', data);
        if (data !== null) {
            return res.json(data)
        } else {
            return res.status(500).json({ error: 'Такого Id не существует' })
        }
    }

    async getAll(req, res) {
        let device = await Moto.findAll()

        return res.json(device)
    }

    async create(req, res, next) {
        try {
            const { mark } = req.body;
            const { image } = req.files;
            console.log('>> image', image);

            const imgName = uuid.v4() + '.jpg';
            const uploadPath = path.resolve(__dirname, '..', 'static', imgName);

            console.log('uploadPath :>> ', uploadPath);
            image.mv(uploadPath);

            const device = await Moto.create({
                mark,
                image: imgName
            })

            return res.json(device)
        } catch (error) {
            next(ApiError.badReq("$ERR: -->" + error.message)) // передаем сообщение, которое лежит в ошибке
        }
    }

    async update(req, res) {
        const { id, mark } = req.body

        if (!id) return next(ApiError.badReq('Не задан id Модели'))

        if (!mark) return next(ApiError.badReq('Не задано имя либо статус'))


        let imgName;

        // Проверяем наличие изображения в запросе
        if (req.files && req.files.image) {
            imgName = uuid.v4() + '.jpg';
            const uploadPath = path.resolve(__dirname, '..', 'static', imgName);

            req.files.image.mv(uploadPath);
        }

        const updatedRowsCount = await Moto.update(
            { mark, image: imgName || null }, // Если image не передан, не обновляем его
            { where: { id } }
        );

        if (updatedRowsCount !== null && updatedRowsCount[0] !== 0) {
            return res.status(200).json({ message: 'Обновление Модели ' + id + ' прошло успешно' })
        } else {
            return res.status(404).json({ message: 'Модель ' + id + ' не найдено' })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query

            const data = await Moto.destroy({ where: { id: id } })

            if (data === 1) {
                return res.status(200).json({ message: 'Удаление Модели ' + id + ' прошло успешно' })
            } else {
                return res.status(404).json({ message: 'Модель ' + id + ' не найдена' })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Произошла ошибка сервера при удалении записи.' });
        }

    }
}

module.exports = new MotoController;