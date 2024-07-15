require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const routes = require('./routes/index');
const errorsMiddleware = require('./middleware/errorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const RozborkaController = require('./controllers/Rozborka.controller');
const DeviceController = require('./controllers/Device.controller');
const MotoController = require('./controllers/Moto.controller')
const ModelController = require('./controllers/Model.controller')
const Modelrouter = require('./routes/model.router');
const port = process.env.PORT || 5200;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  origin: 'http://motorazborka.com.ua',  // Разрешить только этот домен
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Разрешить отправку куки и других данных аутентификации
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(fileUpload());

app.post('/api/rozborka/create', RozborkaController.create);
app.post('/api/device/create', DeviceController.create);
app.post('/api/moto/create', MotoController.create);

app.use('/api', routes);

// Роут для статических файлов
app.use(express.static(path.join(__dirname, 'static')));
// app.use(express.static());

app.use(errorsMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  } catch(e) {
    console.log(`Happen Error: ${e}`);
  }
}

start();

// module.exports = { application: app }