const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// This route will handle POST requests to /api/contact
router.post('/', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // --- Nodemailer Setup ---
    // Create a transporter object using your Gmail account credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email from .env file
            pass: process.env.EMAIL_PASS  // Your App Password from .env file
        }
    });

    // Define the email options
    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender's name and email
        to: process.env.EMAIL_USER,    // The email address where you want to receive messages
        subject: `New Contact Message from ${name}`,
        text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // --- Send the Email ---
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
        }
        
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Message received successfully!' });
    });
});

module.exports = router;
