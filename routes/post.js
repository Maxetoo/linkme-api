const express = require('express')
const PostRouter = express.Router()
const {
    createPost,
    getMyPosts,
    getAllPosts,
    updatePost,
    deletePost,
} = require('../controllers/post')

PostRouter.route('/').post(createPost).get(getAllPosts)
PostRouter.route('/profile').get(getMyPosts)
PostRouter.route('/:id').patch(updatePost).delete(deletePost)

module.exports = PostRouter