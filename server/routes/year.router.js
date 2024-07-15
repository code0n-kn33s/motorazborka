const Router = require('express');
const router = new Router();
const YearController = require('../controllers/Year.controller');

router.get('/:id', YearController.getOne);
router.get('/', YearController.getAll);
router.post('/', YearController.create);
router.patch('/', YearController.update);
router.delete('/', YearController.delete);

module.exports = router;