const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevices = sequelize.define("basket_devices", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  disabled: { type: DataTypes.BOOLEAN, unique: false, defaultValue: false },
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  title: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  typeId: { type: DataTypes.INTEGER, unique: false },
  motoId: { type: DataTypes.INTEGER, unique: false },
  modelId: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  disabled: { type: DataTypes.BOOLEAN, unique: false, defaultValue: false },
});

const Rozborka = sequelize.define("rozborka", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  title: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  motoId: { type: DataTypes.INTEGER, unique: false },
  modelId: { type: DataTypes.STRING },
  yearId: { type: DataTypes.STRING, unique: false },
  typeId: { type: DataTypes.INTEGER, unique: false },
  disabled: { type: DataTypes.BOOLEAN, unique: false, defaultValue: false },
});

const Moto = sequelize.define("moto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mark: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  // disabled: {type: DataTypes.BOOLEAN, unique: false, defaultValue: false},
});

const Model = sequelize.define("model", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  model: { type: DataTypes.STRING, allowNull: false },
  disabled: { type: DataTypes.BOOLEAN, unique: false, defaultValue: false },
  motoId: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  yearId: { type: DataTypes.STRING, unique: false },
});

const YearModel = sequelize.define("year", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  years: { type: DataTypes.STRING, allowNull: false },
  disabled: { type: DataTypes.BOOLEAN, unique: false, defaultValue: false },
});

const TypeAndMoto = sequelize.define("types_and_motos", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketDevices);
BasketDevices.belongsTo(Basket);

BasketDevices.hasMany(Device);
Device.belongsTo(BasketDevices);

Type.hasMany(Device);
Device.belongsTo(Type);

Moto.hasMany(Device);
Device.belongsTo(Moto);

Moto.hasMany(Rozborka);
Rozborka.belongsTo(Moto);

Moto.hasMany(Model);
Model.belongsTo(Moto);

Moto.belongsToMany(Type, { through: TypeAndMoto });
Type.belongsToMany(Moto, { through: TypeAndMoto });

module.exports = {
  User,
  Basket,
  BasketDevices,
  Type,
  Moto,
  Device,
  YearModel,
  Model,
  Rozborka,
  TypeAndMoto,
};
