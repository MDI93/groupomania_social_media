const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    image: {
        type: String
    },
    message: {  
        type: String, 
        required: true,
        maxLength: 300
    },
    likes: {
        type: Number,
        default: 0 
    },
    usersLiked: {
        type:[String]
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Posts', postsSchema);