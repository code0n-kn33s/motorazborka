const Router = require('express');
const router = new Router();
const motoController = require('../controllers/Moto.controller')
// const upload = require('../helpers')

router.get('/:id', motoController.create);
router.get('/', motoController.getAll);
router.delete('/', motoController.create);

// ----

const multer = require('multer');
const uuid = require('uuid');

// Создание экземпляра Multer для обработки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Укажите путь, куда вы хотите сохранить файл
    cb(null, path.resolve(__dirname, '..', 'static', imgName));
  },
  filename: (req, file, cb) => {
    // Генерируем уникальное имя файла
    const imgName = uuid.v4() + '.jpg';
    cb(null, imgName);
  }
});

// Создание экземпляра Multer
const upload = multer({ storage: storage });

// Маршрут для создания
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { model } = req.body;
    const imgName = req.file.filename; // получаем имя сохраненного файла

    console.log('model :>> ', model);
    console.log('imgName :>> ', imgName);

    // Дальнейшая обработка и сохранение данных в базу данных

    res.status(200).json({ message: 'Изображение успешно загружено' });
  } catch (error) {
    next(error);
  }
});


// router.post('/', upload.single('image'), motoController.create);




module.exports = router;