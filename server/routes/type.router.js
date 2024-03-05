const Router = require('express');
const router = new Router();
const typesController = require('../controllers/Types.controller');

router.get('/', typesController.getAll);
router.get('/:id', typesController.getOne);
router.post('/', typesController.create);
router.patch('/', typesController.update);
router.delete('/', typesController.delete);

module.exports = router;