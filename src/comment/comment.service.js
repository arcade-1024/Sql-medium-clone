const User = require('../model/userModel')

class CommentService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }

    getAllComments = async (postId) => {
        const allComments = await this.commentModel.findAll({
            where: {
                PostId: postId
            },
            include: {
                model: User,
                required: false
            }
        });
        if (!allComments) return {error: "No comments found", data: null}
        else {
            return {error: null, data: allComments}
        }
    }
    createComment = async (commentData) => {
        const newComment = await this.commentModel.create(commentData);
        if (!newComment) return {error: "Error adding comment", data: null}
        else {
            return {error: null, data: newComment}
        }
    }
    updateComment = async (updateData, commentId, userId) => {
        const comment = await this.commentModel.findByPk(commentId);
        if (!comment) {
            return {error: "No comment found", data: null}
        } else {
            if (userId !== comment.UserId) {
                return {error: "Restricted action", data: null}
            } else {
                await this.commentModel.update(updateData, {
                    where: {
                        id: comment.id
                    }
                })
                return {error: null, data: "Successfully Updated comment"}
            }
        }
    }
    deleteComment = async (commentId, userId) => {
        const comment = await this.commentModel.findByPk(commentId);
        if (!comment) {
            return {error: "No comment found", data: null}
        } else {
            if (userId !== comment.UserId) {
                return {error: "Restricted action", data: null}
            } else {
                const deleteComment = await this.commentModel.destroy({
                    where: {
                        id: comment.id
                    }
                })
                if (!deleteComment) return {error: "Error deleting comment", data: null}
                else
                    return {error: null, data: "Comment deleted successfully"}
            }
        }
    }
}

module.exports = CommentService