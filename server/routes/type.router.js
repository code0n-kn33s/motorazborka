const Router = require('express');
const router = new Router();
const typesController = require('../controllers/Types.controller');
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', typesController.getAll);
router.get('/:id', typesController.getOne);
router.post('/', typesController.create);
router.patch('/', typesController.update);
router.delete('/', checkRole('ADMIN'), typesController.delete);

module.exports = router;