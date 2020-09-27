let {sequelize, Model, DataTypes }  = require('./Db');

class Equip extends Model{}
Equip.init({
    id           : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id           : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vin_no        : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    make        : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    model        : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year        : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    feature        : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description        : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address      : {
        type: DataTypes.STRING,
        allowNull: true
    },
    lat          : {
        type: DataTypes.STRING,
        allowNull: true
    },
    lng          : {
        type: DataTypes.STRING,
        allowNull: true
    },
    city         : {
        type: DataTypes.STRING,
        allowNull: true
    },
    state        : {
        type: DataTypes.STRING,
        allowNull: true
    },
    country      : {
        type: DataTypes.STRING,
        allowNull: true
    },
    postal_code       : {
        type: DataTypes.STRING,
        allowNull: true
    },
    renter_pickup_return         : {
        type:   DataTypes.ENUM,
        values: ['1', '0'],
        defaultValue:'0'
    },
    owner_pickup_return         : {
        type:   DataTypes.ENUM,
        values: ['1', '0'],
        defaultValue:'0'
    },
    third_party_pickup_return         : {
        type:   DataTypes.ENUM,
        values: ['1', '0'],
        defaultValue:'0'
    },
    free_delivery         : {
        type: DataTypes.STRING,
        allowNull: true
    },
    additional_miles_fee         : {
        type: DataTypes.STRING,
        allowNull: true
    },
    max_miles         : {
        type: DataTypes.STRING,
        allowNull: true
    },
    price_half_day         : {
        type: DataTypes.STRING,
        allowNull: true
    },
    price_day         : {
        type: DataTypes.STRING,
        allowNull: true
    },
    price_month         : {
        type: DataTypes.STRING,
        allowNull: true
    },
    included_hrs_day       : {
        type: DataTypes.STRING,
        allowNull: true
    },
    additional_hour_charge   :{
        type: DataTypes.STRING,
        allowNull: true
    },
    start_date:  {
        type: DataTypes.DATE,
        allowNull: true
    },
    start_time:  {
        type: DataTypes.TIME,
        allowNull: true
    },
    end_date:  {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_time:  {
        type: DataTypes.TIME,
        allowNull: true
    },
    pause :{
        type:   DataTypes.ENUM,
        values: ['1', '0'],
        defaultValue:'0'
    },
    sunday :{
        type:   DataTypes.ENUM,
        values: ['1', '0'],
        defaultValue:'0'
    },
    weekends :{
        type:   DataTypes.ENUM,
        values: ['1', '0'],
        defaultValue:'0'
    },
    instructions     : {
        type: DataTypes.STRING,
        allowNull: true
    },
    status       : {
        type:   DataTypes.ENUM,
        values: ['1', '0'],
        defaultValue:'0'
    },
}, {
    sequelize,
    modelName: 'equipments',
});

sequelize.sync().then(() =>{});

module.exports=Equip;
