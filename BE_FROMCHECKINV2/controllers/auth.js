const firebase = require("./../config/firebase");

// signup
exports.signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Additional user info
      const user = userCredential.user;
      const uid = user.uid;
      
      // Create custom user data
      const userData = {
        email: user.email,
        role: "user",
        points: 0 // Set the initial value of points to 0
      };
      
      // Set the custom user data
      firebase.firestore().collection('users').doc(uid).set(userData)
        .then(() => {
          return res.status(201).json(userCredential);
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
  
  
};

// signin
exports.signin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }

firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    const user = userCredential.user;
    if (user) {
      user.getIdToken()
        .then((idToken) => {
          console.log('token', idToken);
          return res.status(200).json({ email: user.email, token: idToken });
        })
        .catch((error) => {
          console.error('Error getting ID token: ', error);
          return res.status(500).json({ error: 'Internal server error' });
        });
    } else {
      return res.status(500).json({ error: 'Invalid email or password' });
    }
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      return res.status(500).json({ error: errorMessage });
    } else {
      return res.status(500).json({ error: errorMessage });
    }
  });
};
