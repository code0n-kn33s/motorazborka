const { Device } = require('../models/models')
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/errorHandler');
const sharp = require('sharp');

class DeviceController {
    async getOne(req, res, next) {
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
    async getAll(req, res, next) {
        const { motoId, typeId } = req.body;
        let device;

        if (motoId && typeId) {
            device = await Device.findAll({ where: { motoId, typeId } })
        }

        if (!motoId && typeId) {
            device = await Device.findAll({ where: { typeId } })
        }

        if (motoId && !typeId) {
            device = await Device.findAll({ where: { motoId } })
        }

        if (!motoId && !typeId) {
            device = await Device.findAll()
        }

        return res.json(device)
    }

    async create(req, res, next) {
        try {
            const { name, price, typeId, motoId, modelId, title, description, disabled } = req.body;
            const images = req.files?.images;
            let photos = [];

            // первый способ загружать картинки
            // const filePaths = uploadedFiles.map(file => {
            //     const fileName = file.name;
            //     const filePath = `/uploads/${fileName}`;
            //     file.mv(`./public${filePath}`); // Предполагается, что сервер имеет доступ к папке public
            //     return filePath;
            //   });

            // второй способ загружать картинки
            if (images && Array.isArray(images)) {
                for (const img of images) {
                    const imgName = uuid.v4() + '.jpg';
                    const uploadPath = path.resolve(__dirname, '..', 'static', imgName);

                    img.mv(uploadPath);

                    photos.push(imgName);
                }
            } else if (images) {
                const imgName = uuid.v4() + '.jpg';
                const uploadPath = path.resolve(__dirname, '..', 'static', imgName);

                images.mv(uploadPath);

                photos.push(imgName);
            }

            // if (!name && disabled === undefined) return next(ApiError.badReq('Не задано имя либо статус'))
            if (!motoId) return next(ApiError.badReq('Не задано марку мотоцикла'))
            if (!typeId) return next(ApiError.badReq('Не задано тип детали'))
            if (!price) return next(ApiError.badReq('Не задана цена детали'))

            const deviceData = {
                price: parseInt(price),
                typeId: parseInt(typeId),
                motoId: parseInt(motoId),
                images: photos
            };

            if (modelId !== undefined && modelId !== null) {
                deviceData.modelId = modelId
            }

            // Добавляем name, если передан
            if (name !== undefined && name !== null) {
                deviceData.name = name;
            }

            if (title !== undefined && title !== null) {
                deviceData.title = title;
            }

            // Добавляем description, если передан
            if (description !== undefined && description !== null) {
                deviceData.description = description;
            }

            // Добавляем disabled, если передан
            if (disabled !== undefined && disabled !== null) {
                deviceData.disabled = disabled;
            }

            const device = await Device.create(deviceData);

            // images: images ? photos : device.images

            return res.json(device)
        } catch (error) {
            next(ApiError.badReq("$ERR: -->" + error.message)) // передаем сообщение, которое лежит в ошибке
        }
    }

    async update(req, res, next) {
        try {
            const { id, name, price, typeId, motoId, modelId, title, description, disabled } = req.body;
            const images = req.files?.images;
            let photos = [];

            if (!id) return next(ApiError.badReq('Не задано id запчасти'))

            if (images && Array.isArray(images)) {
                for (const img of images) {
                    const imgName = uuid.v4() + '.jpg';
                    const uploadPath = path.resolve(__dirname, '..', 'static', imgName);

                    // Минифицируем изображение с помощью sharp
                    await sharp(img.data)
                        .resize({ width: 800 }) // Установите размеры, которые вам нужны
                        .toFile(uploadPath);

                    photos.push(imgName);
                }
            } else if (images) {
                const imgName = uuid.v4() + '.jpg';
                const uploadPath = path.resolve(__dirname, '..', 'static', imgName);

                // Минифицируем изображение с помощью sharp
                await sharp(images.data)
                    .resize({ width: 800 }) // Установите размеры, которые вам нужны
                    .toFile(uploadPath);

                photos.push(imgName);
            }

            if (req.body.images?.length && Array.isArray(req.body.images)) {
                console.log('req.body.images.length :>> ', req.body.images.length);
                // Если images - это строка, то это имя существующего файла
                photos = [...photos, ...req.body.images];
            } else if (req.body.images && typeof req.body.images === 'string') {
                photos = [...photos, req.body.images];
            }

            const deviceData = {
                id: id
            };

            if (name !== undefined && name !== null) {
                deviceData.name = name;
            }

            if (price !== undefined && price !== null) {
                deviceData.price = parseInt(price);
            }

            if (photos !== undefined && photos !== null && photos.length) {
                deviceData.images = photos;
            }

            if (motoId !== undefined && motoId !== null) {
                deviceData.motoId = parseInt(motoId);
            }

            if (typeId !== undefined && typeId !== null) {
                deviceData.typeId = parseInt(typeId);
            }

            if (modelId !== undefined && modelId !== null) {
                deviceData.modelId = modelId
            }

            if (title !== undefined && title !== null) {
                deviceData.title = title;
            }

            // Добавляем description, если передан
            if (description !== undefined && description !== null) {
                deviceData.description = description;
            }

            // Добавляем disabled, если передан
            if (disabled !== undefined && disabled !== null) {
                deviceData.disabled = disabled;
            }

            // images: images ? photos : device.images
            const device = await Device.update(deviceData, { where: { id: id } })

            if (device[0] === 1) {
                return res.status(200).json({ message: 'Обновление Детали ' + id + ' прошло успешно' })
            } else {
                return res.status(404).json({ message: 'Модель ' + id + ' не найдено' })
            }

        } catch (error) {
            next(ApiError.badReq("$ERR: -->" + error.message)) // передаем сообщение, которое лежит в ошибке
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query

            const type = await Device.destroy({ where: { id: id } })

            if (type === 1) {
                return res.status(200).json({ message: 'Удаление Детали ' + id + ' прошло успешно' })
            } else {
                return res.status(404).json({ message: 'Модель ' + id + ' не найдена' })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Произошла ошибка сервера при удалении записи.' });
        }
    }
}

module.exports = new DeviceController;