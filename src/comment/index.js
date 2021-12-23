const CommentService = require('./comment.service')
const CommentController = require('./commnet.controller')
const commentModel = require('../model/commentModel')
class Comment {
    constructor() {
        this.service = new CommentService(commentModel)
        this.controller = new CommentController(this.service)
    }
}

module.exports = Comment