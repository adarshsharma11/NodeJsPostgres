const {Sequelize, Model, DataTypes } = require('sequelize');

let sequelize = new Sequelize('goequipme', 'goequipme', 'goequipme', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log("Success databse connected!");
}).catch((err) => {
    console.log(err);
});

module.exports= { sequelize,Sequelize, Model, DataTypes };
