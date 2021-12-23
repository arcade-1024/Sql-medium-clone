const PostController = require('./post.controller');
const PostService = require("./post.service")
const postModel = require('../model/postModel');

class Post {
    constructor() {
        this.service = new PostService(postModel)
        this.controller = new PostController(postModel, this.service)
    }
}

module.exports = Post