const { Resend } = require('resend')
require('dotenv').config();

const resendemail = new Resend('re_9bfmKwbp_9eC3Ce7JfVY9nkB5upNbcqGF');

exports.reportIssue = (req, res) => {
  const { email, message } = req.body;
  resendemail.emails.send({
    from: 'support.ata@resend.dev',
    to: ['6331305014@lamduan.mfu.ac.th', '6331305037@lamduan.mfu.ac.th'],
    subject: `Application Report : ${email}`,
    html: `<p>Dear Admin,</p>

    <p>I hope this message finds you well. I am writing to inform you about the submission of a report from our client, ATA IT. The report focuses on issues from our employees.</p>
    
    <p><strong>Report Details:</strong></p>
    
    <ul>
        <li><strong>Report Email:</strong>&nbsp;${email}</li>
        <li><strong>Report Message:</strong> ${message}</li>
        <li><strong>Submission Date:</strong>&nbsp;${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}</li>
    </ul>
    
    <p>Please attention to feedback from our employees and try to solve those issues as fast as you can.</p>
    
    <p>Thank you for your attention to this matter.</p>`
  });
  // const mailOptions = {
  //   from: "",
  //   to: email,
  //   subject: "Autoreply: Thank you for report",
  //   text: "Thank you for reporting. We will get back to you as soon as possible.",
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //     return res.status(500).send("Error sending autoreply email");
  //   }
  //   console.log("Autoreply email sent : " + info.response);
  // });
  res.status(200).send("Report received successfully");
};