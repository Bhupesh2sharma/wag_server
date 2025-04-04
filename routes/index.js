const express = require('express');
const userRoutes = require('./userRoutes');
const contactRoutes = require('./contactRoutes');
const projectRoutes = require('./projectRoutes');
const blogRoutes = require('./blogRoutes');
const router = express.Router();

// Base route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Waglogy API' });
});

// User routes
router.use('/users', userRoutes);

// Contact routes
router.use('/contact', contactRoutes);

// Project routes
router.use('/project', projectRoutes);

// Blog routes
router.use('/blogs', blogRoutes);

// Handle 404
router.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = router;