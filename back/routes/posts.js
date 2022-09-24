const express =  require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const postsCtrl = require('../controllers/posts');

router.get('/', auth, postsCtrl.getAllPosts);
router.post('/', auth, multer, postsCtrl.createPost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);
router.patch('/:id/like', auth, postsCtrl.likeOrDislike);

module.exports = router;