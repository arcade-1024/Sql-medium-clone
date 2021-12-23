const {DataTypes} = require("sequelize")
const db = require('../config/initalizeDb')
const PostModel = db.define('Post', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
})

module.exports = PostModel