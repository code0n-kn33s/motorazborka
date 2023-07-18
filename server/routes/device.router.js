const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/Device.controller')

router.get('/:id', deviceController.getOne);
router.get('/', deviceController.getAll);
router.patch('/', deviceController.update);
router.post('/', deviceController.create);
router.delete('/', deviceController.delete);

module.exports = router;