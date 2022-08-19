const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    myPost: {
        type: String,
        required: [true, 'Please type something'],
        minLength: 5,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)