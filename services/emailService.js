const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };

    return transporter.sendMail(mailOptions);
};
const contactEmailTemplate = (name) => `
    <div style="
        background: linear-gradient(135deg, #0056b3, #007bff);
        color: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 20px auto;
    ">
        <h2 style="margin-bottom: 20px; color: #ffffff; font-size: 24px; text-align: center;">
            Welcome to Waglogy, ${name}!
        </h2>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to us. We're excited to connect with you and will respond to your inquiry within 24 hours.
        </p>
        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h3 style="color: #ffffff; margin-bottom: 15px;">About Waglogy</h3>
            <p style="font-size: 14px; line-height: 1.6;">
                Waglogy is your trusted partner in innovative digital solutions. We specialize in creating cutting-edge web applications, 
                mobile solutions, and digital transformation strategies that help businesses thrive in the modern digital landscape.
            </p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 12px; color: #e6e6e6;">
                Follow us on social media for the latest updates and tech insights!
            </p>
        </div>
    </div>
`;

const contactSubmissionEmailTemplate = (name, email, subject) => `
    <div style="
        background: linear-gradient(135deg, #0056b3, #007bff);
        color: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 20px auto;
    ">
        <h2 style="margin-bottom: 20px; color: #ffffff; font-size: 24px; text-align: center;">
            New Contact Inquiry
        </h2>
        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
        </div>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="font-size: 14px; line-height: 1.6;">
                Please ensure to respond within our standard 24-hour response window. Remember to maintain our professional 
                communication standards and brand voice.
            </p>
        </div>
    </div>
`;

const projectSubmissionEmailTemplate = (name, email, projectDetails, budgetRange) => `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Project Submission</h1>
        </div>
        
        <div style="background-color: white; padding: 20px;">
            <h2 style="color: #007bff;">Project Details</h2>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #007bff;">Submitted At:</strong> ${new Date().toLocaleString()}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #007bff;">Client Name:</strong> ${name}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #007bff;">Client Email:</strong> 
                <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #007bff;">Budget Range:</strong> 
                ${budgetRange || 'Not specified'}
            </div>
            
            <h3 style="color: #007bff;">Project Description:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                ${projectDetails}
            </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #6c757d; font-size: 0.9em;">
            This project submission was received through the Waglogy website.
        </div>
    </div>
`;

const projectConfirmationEmailTemplate = (name) => `
    <div style="
        background: linear-gradient(135deg, #0056b3, #007bff);
        color: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 20px auto;
    ">
        <h2 style="margin-bottom: 20px; color: #ffffff; font-size: 24px; text-align: center;">
            Thank You, ${name}!
        </h2>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We've successfully received your project details and are excited to work with you!
        </p>
        
        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px;">
            <h3 style="color: #ffffff; margin-bottom: 15px;">What's Next?</h3>
            <ul style="font-size: 14px; line-height: 1.6; padding-left: 20px;">
                <li>Our team will review your project requirements</li>
                <li>We'll contact you within 24 hours to discuss next steps</li>
                <li>You'll receive a detailed project proposal</li>
            </ul>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="font-size: 14px; line-height: 1.6;">
                If you have any questions or need to provide additional information, 
                feel free to reply to this email.
            </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 12px; color: #e6e6e6;">
                We're excited to bring your vision to life!
            </p>
        </div>
    </div>
`;

module.exports = { 
    sendEmail, 
    contactEmailTemplate,
    contactSubmissionEmailTemplate,
    projectSubmissionEmailTemplate,
    projectConfirmationEmailTemplate
};