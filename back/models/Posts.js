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
            type: String, 
            required: true
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
        type:[String], 
        required: true
    },
    dislikes: {
        type: Number, 
        default: 0
    },
    usersdisLiked: {
        type:[String],
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Posts', postsSchema);