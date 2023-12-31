const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING },
    role: {type: DataTypes.STRING, defaultValue: "USER" },
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevices = sequelize.define('basket_devices', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Info = sequelize.define('info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    images: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
})

const Moto = sequelize.define('moto', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: true},
})

const Model = sequelize.define('model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    model: {type: DataTypes.STRING, allowNull: true},
    image: {type: DataTypes.STRING, allowNull: true}
})

const TypeAndMoto = sequelize.define('types_and_motos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketDevices)
BasketDevices.belongsTo(Basket)

BasketDevices.hasMany(Device)
Device.belongsTo(BasketDevices)

Type.hasMany(Device)
Device.belongsTo(Type)

Moto.hasMany(Device)
Device.belongsTo(Moto)

Moto.hasMany(Model)
Model.belongsTo(Moto)

Device.hasMany(Info)
Info.hasMany(Device)

Moto.belongsToMany(Type, {through: TypeAndMoto})
Type.belongsToMany(Moto, {through: TypeAndMoto})

module.exports = {
    User,
    Basket,
    BasketDevices,
    Type,
    Moto,
    Info,
    Device,
    TypeAndMoto,
}