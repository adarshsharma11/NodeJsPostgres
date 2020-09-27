let {sequelize,Sequelize, Model, DataTypes }  = require('./Db');


class Category extends Model{}
Category.init({
    id           : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title        : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status       : {
        type:   DataTypes.ENUM,
        values: ['1', '0'],
        defaultValue:'1'
    },
}, {
    sequelize,
    modelName: 'category',
});

sequelize.sync().then(() =>{});

module.exports=Category;
