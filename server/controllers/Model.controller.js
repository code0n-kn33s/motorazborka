const {Device} = require('../models/models')
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/errorHandler');

class ModelController {
    async getOne (req, res) {

    }
    async getAll (req, res) {
        const { motoId, typeId } = req.body;
        console.log('>----req.body---->', req.body);
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
            const { model } = req.body;
            // const { image } = req.files;
            // const imgName = req.file.filename;
            console.log('imgName :>> ', req.body);
            console.log('file :>> ', req.file);
            console.log('files :>> ', req.files);


            // console.log('model :>> ', model);
            // console.log('image :>> ', image);
            // const imgName = uuid.v4() + '.jpg';
            // const uploadPath = path.resolve(__dirname, '..', 'static', imgName);
            // image.mv(uploadPath);

            // const device = await Device.create({
            //     mark,
            //     image: imgName
            // })

            // return res.json(device)
        } catch (error) {
            next(ApiError.badReq("$ERR: -->" + error.message))
        }
    }

    async update (req, res) {
        const { name, price, image, typeId, motoId, info } = req.query

    }

    async delete (req, res) {
        res.status(200).json({messg: "is working!"})

    }
}

module.exports = new ModelController;