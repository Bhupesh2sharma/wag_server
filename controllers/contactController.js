const { Contact } = require('../models');
const { 
    sendEmail, 
    contactEmailTemplate,  // Add this import
    contactSubmissionEmailTemplate 
} = require('../services/emailService');

exports.createContact = async (req, res) => {
    try {
        const { name, email, subject } = req.body;
        
        // Save to database
        const contact = await Contact.create({ name, email, subject });

        // Send email to admin
        await sendEmail(
            process.env.EMAIL_USER, // Admin email
            'New Contact Submission',
            contactSubmissionEmailTemplate(name, email, subject)
        );

        // Send confirmation email to user
        await sendEmail(
            email,
            'Thank You for Contacting Us',
            contactEmailTemplate(name)
        );

        res.status(201).json({
            message: 'Contact form submitted successfully',
            contact
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};