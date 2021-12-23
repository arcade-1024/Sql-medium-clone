const Auth = require('../auth')
const authModule = new Auth();
const {service: authService} = authModule;

class PostController {
    constructor(postModel, postService) {
        this.postModel = postModel;
        this.postService = postService
        this.authService = authService
    }

    getPost = async (req, res) => {
        try {
            const {data, error} = await this.postService.getAllPosts()
            if (error) throw error;
            else {
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({error:e})        }
    }
    createPost = async (req, res) => {
        try {
            const {title, description} = req.body
            const {data, error} = await this.postService.createPost({title, description, UserId: req.user.id})
            if (error) throw error;
            else
                res.send({data})
        } catch (e) {
            res.status(404).send({error:e})        }
    }
    updatePost = async (req, res) => {
        try {
            const {data, error} = await this.postService.updatePost(req.body, req.params.id);
            if (error) throw error
            else{
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({error:e})        }
    }
    deletePost = async (req, res) => {
        try {
            const  {data,error} = await  this.postService.deletePost(req.params.id);
            if(error) throw error;
            else{
                res.send({data})
            }
        } catch (e) {
            res.status(404).send({error:e})
        }
    }
    initializeRouter = () => {
        return {
            rootRoute: "/api/articles",
            routes: [
                {
                    route: "/",
                    method: "GET",
                    middleware: [this.authService.ensureAuthenticated],
                    function: this.getPost,
                },
                {
                    route: "/",
                    method: "POST",
                    middleware: [this.authService.ensureAuthenticated],
                    function: this.createPost,
                },
                {
                    route: "/:id",
                    method: "PATCH",
                    middleware: [this.authService.ensureAuthenticated],
                    function: this.updatePost,
                },
                {
                    route: "/:id",
                    method: "DELETE",
                    middleware: [this.authService.ensureAuthenticated],
                    function: this.deletePost,
                }
            ]

        }
    }
}

module.exports = PostController