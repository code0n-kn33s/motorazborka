const Router = require('express');
const router = new Router();

// Маршрут для создания
// router.post('/create', upload.single('image'), async (req, res, next) => {
//   try {
//     const { mark } = req.body;
//     const imgName = req.file.filename; // получаем имя сохраненного файла

//     // Дальнейшая обработка и сохранение данных в базу данных

//     res.status(200).json({ message: 'Изображение успешно загружено' });
//   } catch (error) {
//     next(error);
//   }
// });

const typeRouter = require('./type.router')
const deviceRouter = require('./device.router')
const motoRouter = require('./moto.router')
const modelRouter = require('./model.router')
const userRouter = require('./user.router')

router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/moto', motoRouter);
// router.use('/model', modelRouter);
router.use('/user', userRouter);
// app.use('/users', usersRouter);

module.exports = router;