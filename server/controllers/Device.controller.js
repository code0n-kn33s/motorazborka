const {Device} = require('../models/models')
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/errorHandler');

class DeviceController {
    async getOne (req, res) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badReq('Не задан id'))
        }

        const type = await Device.findOne({ where: { id: id } })

        if (type !== null) {
            return res.json(type)
        } else {
            return next(ApiError.forbidden("Запчасть не найдена"))
        }
    }
    async getAll (req, res) {
        const { motoId, typeId } = req.body;
        let device;

        if(motoId && typeId) {
            device = await Device.findAll({where: {motoId, typeId}})
        }

        if(!motoId && typeId) {
            device = await Device.findAll({where: {typeId}})
        }

        if(motoId && !typeId) {
            device = await Device.findAll({where: {motoId}})
        }

        if(!motoId && !typeId) {
            device = await Device.findAll()
        }

        return res.json(device)
    }

    async create (req, res, next) {
        try {
            const { name, price, typeId, motoId } = req.body;
            const { images } = req.files;
            let photos = [];

            for(const img of images) {
                const imgName = uuid.v4() + '.jpg';
                const uploadPath = path.resolve(__dirname, '..', 'static', imgName);

                img.mv(uploadPath);

                photos.push(uploadPath);
            }

            const device = await Device.create({
                name, price, typeId, motoId,
                images: photos
            })

            return res.json(device)
        } catch (error) {
            next(ApiError.badReq("$ERR: -->" + error.message)) // передаем сообщение, которое лежит в ошибке
        }
    }

    async update (req, res) {
        const { name, price, image, typeId, motoId, info } = req.query
    }
    async delete (req, res) {
        res.status(200).json({messg: "is working!"})
    }
}

module.exports = new DeviceController;