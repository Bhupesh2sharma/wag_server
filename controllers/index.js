const { Contact, Project, Blog, User } = require('../models');
const { sendEmail, contactEmailTemplate } = require('../services/emailService');

exports.createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        await sendEmail(contact.email, 'Thank You for Contacting Us', contactEmailTemplate(contact.name));
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add similar controllers for Project, Blog, and User