const Posts = require('../models/Posts');
const FormData = require('form-data');
const fs = require('fs');

// Récuperer tous les 'posts' (READ)
exports.getAllPosts = (req, res, next) => {
    Posts.find().sort({createdAt: -1})
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

// Créer un 'post' (CREATE)
exports.createPost = async (req, res, next) => {
    
    const postObject = JSON.parse(req.body.post);
    console.log("postObject", postObject);

    delete postObject._id;
    delete postObject.userId;

    const newPost = new Posts ({
        ...postObject,
        userId: req.auth.userId,
        image: (req.file ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null),
        likes: 0,
        usersLiked: []
    });
    try{
        const post = await newPost.save();
        return res.status(201).json({ message: 'New post has been created !', post });
    }
    catch(error){
        return res.status(400).send(error)
    };
  };

// Récuperer un seul 'post' avec l'ID"
exports.getOnePost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
};

// Modifier un 'post' par le même utilisateur (UPDATE)
exports.updatePost = (req, res, next) => {
    const postData = JSON.parse(req.body.post)
    const postObject = req.file ? {
        ... postData,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...postData };

    delete postObject.userId;
    Posts.findOne({ _id: req.params.id })
        .then((post) => {
            if(post.userId !== req.auth.userId 
                && post.userId !== req.auth.isAdmin){
                res.status(401).json({ message: 'Unauthorized !' });
            } else {
                Posts.updateOne(
                    { _id: req.params.id }, { ...postObject, _id: req.params.id },
                    )
                    .then(() => res.status(200).json({ message: 'Post has been modified !', postObject}))
                    .catch(error => res.status(400).json({ error }));
            }
        })  
        .catch(error => res.status(400).json({ error }))  
};        

// Supprimer un 'post' par le même utilisateur (DELETE)
exports.deletePost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
        .then(post => {
            console.log("back end deletePost", Posts)
            if(post.userId !== req.auth.userId 
                && post.userId !== req.auth.isAdmin){
                res.status(401).json({ message: 'Unauthorized !'});
            } else {
                const filename = post.image.split('/images/')[0];
                fs.unlink(`images/${filename}`, 
                () => {
                    Posts.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Post has been deleted !' })})
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch( error => res.status(500).json({ error }));
};

// Ajouter un 'like'
exports.likePost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
        .then((post) => {             
        if( !post.usersLiked.includes(req.auth.userId) ){
            Posts.updateOne(
            { _id: req.params.id }, 
            { $inc:{ likes: 1 }, $push: { usersLiked: req.auth.userId }})
            .then(() => res.status(201).json({ message: 'Like has been added !' }))  
            .catch(error => res.status(400).json({ error }));     
        } else {
        Posts.updateOne(
            { _id: req.params.id }, 
            { $inc:{ likes: -1 }, $pull: { usersLiked: req.auth.userId }}
            )
            .then(() => res.status(201).json({ message: 'Like has been canceled !' }))  
            .catch(error => res.status(400).json({ error }));
        }
})};
