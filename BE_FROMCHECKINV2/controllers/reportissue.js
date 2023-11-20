const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your@gmail.com', // Your Gmail email address
    pass: 'your-password', // Your Gmail password or an App Password
  },
});

exports.ReportIssue = async (req, res) => {

    app.post('/submit-issue', (req, res) => {

        const { adminEmail, applicationIssue } = req.body;
      
        const mailOptions = {
          from: 'your@gmail.com', // Sender's email address
          to: adminEmail,
          subject: 'New Application Issue Report',
          text: `Application Issue: ${applicationIssue}`,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
          }
        });
      });

}


