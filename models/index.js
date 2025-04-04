const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true }
});

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectDetails: { type: String, required: true },
    budgetRange: { type: String }
});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { 
        type: [String], 
        required: true,
        validate: {
            validator: function(v) {
                return v.length >= 3;
            },
            message: 'At least 3 images are required'
        }
    },
    likes: { type: Number, default: 0 },
    comments: [{
        username: { type: String, required: true },  // Changed from user reference
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = {
    Contact: mongoose.model('Contact', contactSchema),
    Project: mongoose.model('Project', projectSchema),
    Blog: mongoose.model('Blog', blogSchema),
    User: mongoose.model('User', userSchema)
};