const UserController = require('./user.controller')
const UserService = require('./user.service')
const UserModel = require('../model/userModel')

class User {
    constructor(db) {
        this.userModel = new UserModel(db)
         this.service = new UserService(this.userModel.defineUser())
        this.controller = new UserController(this.userModel.defineUser(), this.service)
    }
}

module.exports = User