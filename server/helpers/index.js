const multer = require('multer');
const uuid = require('uuid');

// Создание экземпляра Multer для обработки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('111 req :>> ', req);
    // Укажите путь, куда вы хотите сохранить файл
    cb(null, path.resolve(__dirname, '..', 'static', imgName));
  },
  filename: (req, file, cb) => {
    // Генерируем уникальное имя файла
    console.log('222 req :>> ', req);
    const imgName = uuid.v4() + '.jpg';
    cb(null, imgName);
  }
});

// Создание экземпляра Multer
const upload = multer({ storage });

module.exports = upload;