const Router = require('express');
const router = new Router();
const modelController = require('../controllers/Model.controller');

router.get('/:id', modelController.getOne);
router.get('/', modelController.getAll);
router.post('/', modelController.create);
router.patch('/', modelController.update);
router.delete('/', modelController.delete);

module.exports = router;