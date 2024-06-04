const Router = require('express');
const router = new Router();
const rozborkaController = require('../controllers/Rozborka.controller')

router.get('/:id', rozborkaController.getOne);
router.get('/', rozborkaController.getAll);
router.patch('/', rozborkaController.update);
// router.post('/', rozborkaController.create);
router.delete('/', rozborkaController.delete);

module.exports = router;