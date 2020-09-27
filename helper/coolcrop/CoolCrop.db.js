const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('coolcrop2', 'tester', 'password', {
    host: '18.232.57.218',
    dialect:  'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const CropList = sequelize.define('crop_list', {
    // attributes
    name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// MarketList Model
const MarketList = sequelize.define('market_list', {

    name: {
        type: Sequelize.STRING
    },
    county: {
        type: Sequelize.STRING
    },
    area: {
        type: Sequelize.STRING
    },
    address:{
        type: Sequelize.STRING
    },
    lat:{
        type: Sequelize.STRING
    },
    lon:{
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// PredictPrice Model
const PredictPrice = sequelize.define('predict_price', {
    market_id: {
        type: Sequelize.STRING
    },
    crop_id: {
        type: Sequelize.STRING
    },
    date_id: {
        type: Sequelize.STRING
    },
    b_size:{
        type: Sequelize.STRING
    },
    price:{
        type: Sequelize.STRING
    }

},{
    freezeTableName: true,
    timestamps: false
});


// PredictPrice Model
const DateList = sequelize.define('date_list', {

    date:{
        type: Sequelize.DATEONLY
    }

},{
    freezeTableName: true,
    timestamps: false
});


PredictPrice.belongsTo(DateList, {foreignKey: 'date_ID'});

module.exports={
    sequelize,
    CropList,
    MarketList,
    PredictPrice,
    DateList
};