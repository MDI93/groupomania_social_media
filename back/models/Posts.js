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
        type: String, 
    },
    usersLiked: {
        type:[String], 
    },
    dislikes: {
        type: String, 
    },
    usersdisLiked: {
        type:[String],
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Posts', postsSchema);