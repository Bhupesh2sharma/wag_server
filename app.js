const express = require('express');
const fileUpload = require('express-fileupload');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(fileUpload());

// Routes
app.use('/api/blogs', blogRoutes);

module.exports = app;