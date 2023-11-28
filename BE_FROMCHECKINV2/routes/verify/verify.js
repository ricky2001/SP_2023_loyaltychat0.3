const admin = require("../../config/firebaseadmin");




exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' , status:'401'});
  }

  const tokenOnly = token.split(' ')[1];

  admin.auth().verifyIdToken(tokenOnly)
    .then((decodedToken) => {
      const now = new Date().getTime() / 1000;
      if (decodedToken.exp < now) {
        // Token has expired, return a refresh token response
        admin.auth().createCustomToken(decodedToken.uid)
          .then((customToken) => {
            return res.status(401).json({
              error: 'Token expired',
              status: '401',
              access_token: customToken,
              expires_in: 3600
            });
          })
          .catch((error) => {
            console.error('Error creating custom token: ', error);
            return res.status(500).json({ error: 'Internal server error' });
          });
      } else {
        // Token is valid, set the user in the request and call the next middleware
        req.user = decodedToken;
        next();
      }
    })
    .catch((error) => {
      console.error('Error verifying token: ', error);
      return res.status(401).json({ error: 'Unauthorized', status: '401' });
    });
};
