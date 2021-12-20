const {DataTypes} = require("sequelize")

// class UserModel extends Model {
// }
//
// UserModel.init({
//     firstName: {
//         type: DataTypes.STRING
//     }, lastName: {
//         type: DataTypes.STRING
//     }
// }, {
//     sequelize,
//     modelName: 'User'
// })

class UserModel {
    constructor(db) {
        this.database = db
    }

    defineUser = () => this.database.define('User', {
        name: {
            type: DataTypes.STRING
        }, email: {
            type: DataTypes.STRING
        }, password: {
            type: DataTypes.STRING
        }
    })

}

module.exports = UserModel