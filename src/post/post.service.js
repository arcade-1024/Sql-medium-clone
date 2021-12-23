class PostService {
    constructor(postModel) {
        this.postModel = postModel
    }

    getAllPosts = async () => {
        const allPosts = await this.postModel.findAll();
        if (!allPosts) return {error: "No post found", data: null}
        else {
            return {error: null, data: allPosts}
        }
    }
    createPost = async (postData) => {
        const newPost = await this.postModel.create(postData);
        if (!newPost) return {error: "Error adding post", data: null}
        else {
            return {error: null, data: newPost}
        }
    }
    updatePost = async (updateData, postId) => {
        const post = await this.postModel.findByPk(postId);
        if (!post) return {error: "No post to edit", data: null}
        else {
            await this.postModel.update(updateData, {
                where: {
                    id: post.id
                }
            })
            return {error: null, data: "Successfully updated post"}
        }
    }

    deletePost = async (postId) => {
        const deletePost = await this.postModel.destroy({
            where: {
                id: postId
            }
        })
        if (!deletePost) return {error: "Error deleting post", data: null}
        else
            return {error:null,data:"Post deleted successfully"}
    }

}

module.exports = PostService