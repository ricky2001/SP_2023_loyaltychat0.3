const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

// Read newsfeed items
exports.getNewsfeed = (req, res) => {
  firebase.firestore().collection('newsfeed').get()
    .then((querySnapshot) => {
      const newsfeedItems = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
            if (doc.data()) {
              return res.status(200).json(doc.data())
            }
      });
      return res.status(200).json({ newsfeedItems });
    })
    .catch((error) => {
      console.error('Error getting newsfeed items: ', error);
      return res.status(500).json({ message: 'Internal server error' });
    });
};

// Create a new newsfeed item
exports.createNewsfeedItem = (req, res) => {
  const { content } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const email = decodedToken.email;

      // Create a new newsfeed item
      firebase
        .firestore()
        .collection('newsfeed')
        .add({
          content,
          author: email,
          timestamp: new Date(),
        })
        .then((docRef) => {
          console.log('Newsfeed item added with ID: ', docRef.id);
          return res.status(201).json({ message: 'Newsfeed item created successfully' });
        })
        .catch((error) => {
          console.error('Error adding newsfeed item: ', error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
};

// Update a newsfeed item by ID
exports.updateNewsfeedItem = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then(() => {
      // Update the newsfeed item
      firebase
        .firestore()
        .collection('newsfeed')
        .doc(id)
        .update({
          content,
          timestamp: new Date(),
        })
        .then(() => {
          console.log('Newsfeed item updated with ID: ', id);
          return res.status(200).json({ message: 'Newsfeed item updated successfully' });
        })
        .catch((error) => {
          console.error('Error updating newsfeed item: ', error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
};

// Delete a newsfeed item by ID
exports.deleteNewsfeedItem = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then(() => {
      // Delete the newsfeed item
      firebase
        .firestore()
        .collection('newsfeed')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Newsfeed item deleted with ID: ', id);
          return res.status(200).json({ message: 'Newsfeed item deleted successfully' });
        })
        .catch((error) => {
          console.error('Error deleting newsfeed item: ', error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
};
