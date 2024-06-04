const Router = require('express');
const router = new Router();

const typeRouter = require('./type.router')
const deviceRouter = require('./device.router')
const motoRouter = require('./moto.router')
const modelRouter = require('./model.router')
const yearRouter = require('./year.router')
const userRouter = require('./user.router')
const rozborkaRouter = require('./rozborka.router')

router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/moto', motoRouter);
router.use('/model', modelRouter);
router.use('/year', yearRouter);
router.use('/rozborka', rozborkaRouter);
router.use('/user', userRouter);

module.exports = router;