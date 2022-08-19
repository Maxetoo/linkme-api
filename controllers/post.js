const Post = require('../models/post')
const { StatusCodes } = require('http-status-codes')
const {
    NotFoundError,
    BadRequestError,
    UnauthorisedError,
} = require('../errors')
const createPost = async(req, res) => {
    req.body.createdBy = req.user.user_id
    const post = await Post.create(req.body)
    res.status(StatusCodes.OK).json({ post })
}

const getMyPosts = async(req, res) => {
    const { user_id } = req.user
    const post = await Post.find({
        createdBy: user_id,
    }).sort('createdAt')
    if (!post) throw new NotFoundError('No available post')
    res.status(StatusCodes.OK).json({ post })
}

const getAllPosts = async(req, res) => {
    const { search } = req.query
    const posts = await Post.find({
        myPost: {
            $regex: search || '',
            $options: 'i',
        },
    })
    if (!posts) throw new NotFoundError(`Search ${search} not found`)
    res.status(StatusCodes.OK).json({ posts })
}

const updatePost = async(req, res) => {
    const { user_id } = req.user
    const { id } = req.params
    const post = await Post.findOneAndUpdate({
            createdBy: user_id,
            _id: id,
        },
        req.body, {
            new: true,
            runValidators: true,
        }
    )
    if (!post) throw new NotFoundError(`No post with id ${id}`)
    res.status(StatusCodes.OK).json({ post })
}

const deletePost = async(req, res) => {
    const { user_id } = req.user
    const { id } = req.params
    const post = await Post.findOneAndDelete({
        createdBy: user_id,
        _id: id,
    })
    if (!post) throw new NotFoundError(`No post with id: ${id} found`)
    res.status(StatusCodes.OK).json({ post })
}

module.exports = {
    createPost,
    getMyPosts,
    getAllPosts,
    updatePost,
    deletePost,
}