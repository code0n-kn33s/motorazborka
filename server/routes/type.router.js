const Router = require('express');
const router = new Router();
const typesController = require('../controllers/Types.controller');

router.get('/:id', typesController.getOne);
router.get('/', typesController.getAll);
router.post('/', typesController.create);
router.delete('/', typesController.delete);

module.exports = router;