const {Moto} = require('../models/models')
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/errorHandler');

class MotoController {
    async getOne (req, res) {

    }
    async getAll (req, res) {
        const { motoId, typeId } = req.body;
        console.log('>----req.body---->', req.body);
        let device;

        if(motoId && typeId) {
            device = await Moto.findAll({where: {motoId, typeId}})
        }

        if(!motoId && typeId) {
            device = await Moto.findAll({where: {typeId}})
        }

        if(motoId && !typeId) {
            device = await Moto.findAll({where: {motoId}})
        }

        if(!motoId && !typeId) {
            device = await Moto.findAll()
        }

        return res.json(device)
    }

    async create (req, res, next) {
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

    async update (req, res) {
        const { name, price, image, typeId, motoId, info } = req.query
    }
    async delete (req, res) {
        res.status(200).json({messg: "is working!"})
    }
}

module.exports = new MotoController;