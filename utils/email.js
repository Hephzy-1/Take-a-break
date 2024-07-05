const nodemailer = require('nodemailer');
require('dotenv').config()

// Transporter Object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'stmp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.Email,
    pass: process.env.EmailPassword
  }
});

async function registerEmail (firstName, email) {
  const mailOptions = {
    from: 'Take A Break',
    to: email,
    subject: 'Welcome to Take a Break!',
    html: `Dear ${firstName}, <br><br>

    Welcome to Take a Break! We’re thrilled to have you on board. <br><br>

    Life can be hectic, and it’s easy to get overwhelmed. That’s why we created Take a Break—a digital buddy dedicated to helping you find moments of relaxation and calm amidst the chaos. <br><br>

    With our reminders and tips, you’ll be able to take a breather and recharge, no matter how busy your day gets. Here’s what you can expect: <br>
    - Timely reminders to pause and relax <br>
    - Personalized relaxation tips and activities <br>
    - A supportive community focused on well-being <br>
    - Regular updates with new content and features <br><br>

    To get started, log in to your account and explore all the features we have to offer. If you have any questions, feel free to reach out to our support team ${process.env.Email} <br><br>

    Thank you for choosing Take A Break. We are excited to help you create a balanced and relaxed lifestyle! <br><br>

    Best regards,
    <br>
    Take a Break Team`
  }

  const info = transporter.sendMail(mailOptions)

  await info.response
}

const resetLinkMail = async (req, firstName, email, token) => {
  const getBaseURL = (req) => {
    return `${req.protocol}://${req.get('host')}`;
  };

  const baseURL = getBaseURL(req);
  const resetLink = `${baseURL}/auth/reset/${token}`;

  const mailOptions = {
    from: 'Take A Break',
    to: email,
    subject: 'Password Reset Request for Your Take a Break Account',
    html: `Subject: 

    Dear [User's Name],

    We received a request to reset the password for your Take a Break account. Don’t worry, we’ve got you covered! 

    To reset your password, please click the link below:

    [Reset Password Link]

    This link will expire in 24 hours for your security. If you need a new link, simply request another password reset from our website.

    If you did not request a password reset, please ignore this email. Your account remains secure, and no changes have been made.

    For any further assistance, feel free to contact our support team at [support email].

    Stay relaxed and take care!

    Best regards,

    The Take a Break Team

    [Website URL]`
  };

  const info = await transporter.sendMail(mailOptions);

  return info.response;
};

async function contactUs (email, subject, fullname, message) {
  const mailOptions = {
    from: email,
    to: process.env.Email,
    subject: `Contact Us TAB: ${subject}`,
    text: `Name: ${fullname} \nEmail: ${email} \nMessage: ${message}`
  }

  const info = await transporter.sendMail(mailOptions);
  return info.response
}

async function newsletterMail (email) {
  const mailOptions = {
    from: 'Take A Break',
    to: email,
    subject: 'Newsletter',
    text: `Thank you for subscribing to Take a Break Newsletter. Stay tuned for updates.`
  }

  const info = await transporter.sendMail(mailOptions);
  return info.response
}

// async function feedback (message) {
//   const mailOptions = {
//     from: 'user',
//     to: process.env.Email,
//     subject: `TAB Feedback`,
//     text: `Message: ${message}`
//   }

//   const info = await transporter.sendMail(mailOptions);
//   return info.response
// }

async function feedbackMail(message) {
  const mailOptions = {
    from: 'user',
    to: process.env.Email,
    subject: 'TAB Feedback', // Corrected syntax
    text: `Message: ${message}` // Corrected syntax
  };

  const info = await transporter.sendMail(mailOptions);
  return info.response;
}

module.exports = {
  registerEmail,
  resetLinkMail,
  contactUs,
  newsletterMail,
  feedbackMail
}