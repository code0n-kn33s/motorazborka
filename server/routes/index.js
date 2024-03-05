const Router = require('express');
const router = new Router();

const typeRouter = require('./type.router')
const deviceRouter = require('./device.router')
const motoRouter = require('./moto.router')
const modelRouter = require('./model.router')
const userRouter = require('./user.router')

router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/moto', motoRouter);
router.use('/model', modelRouter);
router.use('/user', userRouter);

module.exports = router;