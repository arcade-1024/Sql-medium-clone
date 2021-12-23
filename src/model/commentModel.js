const {DataTypes} = require('sequelize')
const db = require('../config/initalizeDb')
const CommentModel = db.define('Comment',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text:{
        type: DataTypes.STRING
    }
})

module.exports = CommentModel