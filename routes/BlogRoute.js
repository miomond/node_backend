// routes/blog.js
const express = require('express')
const router = express.Router();
const BlogController = require('../controllers/BlogController');

router.post('/', BlogController.createBlog);
router.get('/', BlogController.getBlogs);
router.get('/:id', BlogController.getBlog);
router.put('/:id', BlogController.updateBlog);
router.delete('/:id', BlogController.deleteBlog);

module.exports = router;

