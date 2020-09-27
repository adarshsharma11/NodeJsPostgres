let {sequelize,Sequelize, Model, DataTypes }  = require('./Db');
const bcrypt = require('bcrypt');

class User extends Model{}
User.init({
                id           : {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                email        : {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: true,
                },
                password     : {
                    type: DataTypes.STRING,
                    allowNull: true,

                },
                first_name   : {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                last_name    : {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                profile_pic  : {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                google_id    : {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                facebook_id  : {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                company_name : {
                    type: DataTypes.STRING,
                    allowNull: true
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
                postal       : {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                code         : {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                phone_no     : {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                email_pref   : {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                phone_pref   : {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                discount_pref: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                remember_token: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                device_token: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                is_email_verified :{
                    type:   DataTypes.ENUM,
                    values: ['1', '0'],
                    defaultValue:'0'
                },
                is_phone_verified :{
                    type:   DataTypes.ENUM,
                    values: ['1', '0'],
                    defaultValue:'0'
                },
                login_type : {
                    type:   DataTypes.ENUM,
                    values: ['F', 'G','N'],
                    defaultValue:'N'
                },
                status       : {
                    type:   DataTypes.ENUM,
                    values: ['1', '0'],
                    defaultValue:'0'
        },
    }, {
            sequelize,
            modelName: 'users',
            hooks: {
                beforeCreate: async function (user) {
                    if (user.login_type == "N") {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                }
            }
});
User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
sequelize.sync().then(() =>{});

module.exports=User;
