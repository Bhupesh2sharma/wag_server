const cloudinary = require('cloudinary').v2;
const { Blog } = require('../models');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create Blog Post
exports.createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        // Upload images to Cloudinary
        const imageUrls = await Promise.all(req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        }));

        const blog = await Blog.create({
            title,
            description,
            images: imageUrls
        });

        res.status(201).json({
            message: 'Blog created successfully',
            blog
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Blog Posts
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Single Blog Post
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const blog = await Blog.findByIdAndUpdate(
            id,
            { $push: { comments: { username: 'Unknown', text } } },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(201).json({
            message: 'Comment added successfully',
            comment: blog.comments[blog.comments.length - 1]
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.likeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findByIdAndUpdate(
            blogId,
            { $inc: { likes: 1 } },
            { new: true }
        );

        res.json({
            message: 'Blog liked successfully',
            blog
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).select('comments');
        
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({
            comments: blog.comments
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getLikes = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).select('likes');
        
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({
            likes: blog.likes
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};