const express = require('express');
const router = express.Router();
const { 
    createBlog,
    getAllBlogs,
    getBlogById,
    addComment,
    getComments,
    likeBlog,
    getLikes
} = require('../controllers/blogController');

// Basic blog routes
router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Comment routes
router.post('/:id/comments', addComment);
router.get('/:id/comments', getComments);

// Like routes
router.post('/:id/like', likeBlog);
router.get('/:id/likes', getLikes);

module.exports = router;