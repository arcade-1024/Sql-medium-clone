const UserController = require('./user.controller')
const UserService = require('./user.service')
const userModel = require('../model/userModel')

class User {
    constructor() {
        this.service = new UserService(userModel)
        this.controller = new UserController(userModel, this.service)
    }
}

module.exports = User