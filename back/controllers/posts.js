const Posts = require('../models/Posts');
const fs = require('fs');

// Récuperer tous les 'posts' (READ)
exports.getAllPosts = (req, res, next) => {
    Posts.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

// Créer un 'post' (CREATE)
exports.createPost = async (req, res, next) => {
    const postObject = req.body.post
    delete postObject._id;
    delete postObject.userId;

    const newPost = new Posts ({
        ...postObject,
        userId: req.auth.userId,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        usersLiked: [' ']
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
    const postObject = req.file ? {
        ...req.body.sauce,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body.post };

    delete postObject.userId;
    Posts.findOne({ _id: req.params.id })
        .then((post) => {
            if(post.userId != req.auth.userId){
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
            if(post.userId != req.auth.userId){
                res.status(401).json({ message: 'Unauthorized !'});
            } else {
                const filename = post.image.split('/images/')[1];
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
        .then((likeAdd) => {
// Si like = 1, l'utilisateur aime (= like) le post              
        if( !likeAdd.usersLiked.includes(req.body.userId) && req.body.like === 1 ){
            Posts.updateOne(
            { _id: req.params.id }, 
            { $inc:{ likes: 1 }, $push: { usersLiked: req.body.userId }})
            .then(() => res.status(201).json({ message: 'Like has been added !' }))  
            .catch(error => res.status(400).json({ error }));         
        }  
// Si like = 0, l'utilisateur annule son 'like'   
    else {
    Posts.findOne({ _id: req.params.id })
        .then((likeCanceled) => {
        if( likeCanceled.usersLiked.includes(req.body.userId) && req.body.like === 0 ){
            Posts.updateOne(
            { _id: req.params.id }, 
            { $inc:{ likes: -1 }, $pull: { usersLiked: req.body.userId }}
            )
            .then(() => res.status(201).json({ message: 'Like has been canceled !' }))  
            .catch(error => res.status(400).json({ error }));
    }})
        .catch(error => res.status(404).json({ error }));
    }})};
