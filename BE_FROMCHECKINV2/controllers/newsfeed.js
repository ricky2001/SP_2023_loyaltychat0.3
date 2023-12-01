const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

// Read newsfeed items
exports.getNews = (req, res) => {
  firebase
    .firestore()
    .collection('newsfeed')
    .orderBy('timestamp', 'desc') // Order by timestamp in descending order (newest to oldest)
    .get()
    .then((querySnapshot) => {
      const newsfeedItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.author && data.detail) {
          newsfeedItems.push({ id: doc.id, author: data.author, detail: data.detail, timestamp: data.timestamp });
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
exports.createNews = (req, res) => {
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
          detail: content,
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
exports.updateNews = (req, res) => {
  const id = req.query.id;
  const { author,detail } = req.body;
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
          detail: detail,
          author: author,
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
exports.deleteNews = (req, res) => {
  const id = req.query.id;
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
