// controllers/blogs.js

const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  const { title, body, photo, tags } = req.body;
console.log(req.user._id);
  // Validate input
  if (!title || !body) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  // Create new blog
  const newBlog = new Blog({title,body,photo, author: req.user._id,tags, });
  await newBlog.save();
  // Return success response
  res.status(201).json({ blog: newBlog });
};

const getBlogs = async (req, res) => {
  // Get all blogs
  const blogs = await Blog.find();

  // Return success response
  res.status(200).json({ blogs });
};

const getBlog = async (req, res) => {
  // Get blog by id
  const blog = await Blog.findOne({ _id: req.params.id });

  // Return success response
  res.status(200).json({ blog });
};

const updateBlog = async (req, res) => {
  // Get blog by id
  const blog = await Blog.findOne({ _id: req.params.id });

  // Validate input
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found.' });
  }

  // Update blog
  const { title, body, photo, tags } = req.body;
  blog.title = title;
  blog.body = body;
  blog.photo = photo;
  blog.tags = tags;
  await blog.save();

  // Return success response
  res.status(200).json({ blog });
};

const deleteBlog = async (req, res) => {
  // Get blog by id
  const blog = await Blog.findOne({ _id: req.params.id });

  // Validate input
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found.' });
  }

  // Delete blog
  await blog.remove();

  // Return success response
  res.status(200).json({ message: 'Blog deleted.' });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
