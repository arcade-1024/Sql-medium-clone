const AuthService = require("./auth.service")
const AuthController =  require("./auth.controller")
const userModel = require('../model/userModel')
class Auth{
    constructor() {
        this.service = new AuthService(userModel)
        this.controller = new AuthController(this.service)
    }
}
module.exports = Auth