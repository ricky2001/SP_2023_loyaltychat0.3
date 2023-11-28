// // backend/controllers/reportissue.js
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'Nuntawat196@gmail.com', // Your Gmail email address
//     pass: 'mygmailgan25438', // Your Gmail password or an App Password
//   },
// });

// exports.ReportIssue = async (req, res) => {
//   const { adminEmail, applicationIssue } = req.body;

//   const mailOptions = {
//     from: 'your@gmail.com', // Sender's email address
//     to: adminEmail,
//     subject: 'New Application Issue Report',
//     text: `Application Issue: ${applicationIssue}`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error sending email');
//   }
// };
