const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.notification = (req, res) => {
    const { registrationToken, title, body } = req.body;
  
    if (!registrationToken || !title || !body) {
      return res.status(400).json({ error: 'Invalid request. Registration token, title, and body are required.' });
    }
  
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: registrationToken,
    };
  
    admin.messaging().send(message)
      .then((response) => {
        // console.log('Notification sent successfully:', response);
        res.status(200).json({ success: true });
      })
      .catch((error) => {
        // console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification.' });
      });
  };