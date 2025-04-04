const { Project } = require('../models');
const { 
    sendEmail, 
    projectSubmissionEmailTemplate,
    projectConfirmationEmailTemplate
} = require('../services/emailService');

exports.createProject = async (req, res) => {
    try {
        const { name, email, projectDetails, budgetRange } = req.body;
        
        // Save to database
        const project = await Project.create({ 
            name, 
            email, 
            projectDetails, 
            budgetRange 
        });

        // Send email to admin
        await sendEmail(
            process.env.EMAIL_USER, // Admin email
            'New Project Submission',
            projectSubmissionEmailTemplate(name, email, projectDetails, budgetRange)
        );

        // Send confirmation email to user
        // Update the confirmation email section
        await sendEmail(
            email,
            'Thank You for Your Project Submission',
            projectConfirmationEmailTemplate(name)
        );

        res.status(201).json({
            message: 'Project submitted successfully',
            project
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};