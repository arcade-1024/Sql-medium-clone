const Auth = require('../auth')
const authModule = new Auth();
const {service: authService} = authModule;

class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
        this.authService = authService
    }

    getAllComments = async (req, res) => {
        try {
            const {data, error} = await this.commentService.getAllComments(req.params.postId)
            if (error) {
                throw error
            } else {
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({error: e})
        }
    }

    createComment = async (req, res) => {
        try {
            const {comment} = req.body
            const {data, error} = await this.commentService.createComment({
                text: comment,
                UserId: req.user.id,
                PostId: req.params.postId
            })
            if (error) throw error;
            else
                res.send({data})
        } catch (e) {
            res.status(404).send({error: e})
        }
    }

    updateComment = async (req, res) => {
        try {
            const {comment} = req.body
            const {data, error} = await this.commentService.updateComment({text: comment}, req.params.commentId,req.user.id);
            if (error) throw error;
            else {
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({error: e})
        }
    }

    deleteComment = async (req, res) => {
        try {
            const {data, error} = await this.commentService.deleteComment(req.params.commentId,req.user.id);
            if (error) throw error;
            else {
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({error: e})
        }
    }
    initializeRouter = () => {
        return {
            rootRoute: "/api/articles",
            routes: [
                {
                    route: "/:postId/comments",
                    method: "GET",
                    middleware: [this.authService.ensureAuthenticated],
                    function: this.getAllComments,
                },
                {
                    route: "/:postId/comments",
                    method: "POST",
                    middleware: [this.authService.ensureAuthenticated],
                    function: this.createComment,
                },
                {
                    route: "/:postId/comments/:commentId",
                    method: "PATCH",
                    middleware: [this.authService.ensureAuthenticated],
                    function: this.updateComment,
                },
                {
                    route: "/:postId/comments/:commentId",
                    method: "DELETE",
                    middleware: [this.authService.ensureAuthenticated],
                    function: this.deleteComment,
                },
            ]
        }
    }
}

module.exports = CommentController