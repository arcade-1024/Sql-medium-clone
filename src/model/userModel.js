const {DataTypes} = require("sequelize")
const bcrypt = require("bcrypt");
const db = require('../config/initalizeDb')
const UserModel = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    }, email: {
        type: DataTypes.STRING,
    }, password: {
        type: DataTypes.STRING
    }
},{
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 8);
            }
        },
        beforeUpdate:async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password,8);
            }
        }
    }
})

module.exports = UserModel