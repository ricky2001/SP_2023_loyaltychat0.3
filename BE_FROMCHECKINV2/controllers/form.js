const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

// Read items
exports.getForm = (req, res) => {
  const eventId = req.params.eventId;
  firebase
    .firestore()
    .collection('form')
    .orderBy('Date', 'desc')
    .get()
    .then((querySnapshot) => {
      const formItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.EventName) {
          const formattedDate = data.Date.toDate().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

          formItems.push({
            id: doc.id,
            EventName: data.EventName,
            Date: formattedDate,
          });
        }
      });
      return res.status(200).json({ formItems });
    })
    .catch((error) => {
      console.error('Error getting Form items: ', error);
      return res.status(500).json({ message: 'Internal server error' });
    });
};

// Create a new item
exports.createForm = (req, res) => {
  const { content } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const email = decodedToken.email;

      // Create a new item
      firebase
        .firestore()
        .collection('form')
        .doc(content).set({
          EventName: content,
          Email: email,
          Date: new Date(),
        })
        .then((docRef) => {
          console.log('Form item added with ID: ', content);
          return res.status(201).json({ message: 'Form item created successfully' });
        })
        .catch((error) => {
          console.error('Error adding form item: ', error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
};

// Update a item by ID
exports.updateForm = (req, res) => {
  console.log('Request Body:', req.body);
  const id = req.body.id;
  const { EventName} = req.body;
  const token = req.headers.authorization.split(" ")[1];

  if (id==null) {
    return res.status(400).json({ error: 'ID is missing in the request body' });
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
        const email = decodedToken.email;
      // Update the item
      firebase
        .firestore()
        .collection('form')
        .doc(id)
        .update({
          EventName: EventName,
          Email: email,
          Date: new Date(),
        })
        .then(() => {
          console.log('Form item updated with ID: ', id);
          return res.status(200).json({ message: 'Form item updated successfully' });
        })
        .catch((error) => {
          console.error('Error updating form item: ', error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
};

// Delete a item by ID
exports.deleteForm = (req, res) => {
  const id = req.query.id;
  const token = req.headers.authorization.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then(() => {
      // Delete the item
      firebase
        .firestore()
        .collection('form')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Form item deleted with ID: ', id);
          return res.status(200).json({ message: 'Form deleted successfully' });
        })
        .catch((error) => {
          console.error('Error deleting Form: ', error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
};

// Keep form submission
exports.keepForm = (req, res) => {
  const { satisfied, comments, EventName } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const email = decodedToken.email;

      // Create a new item with a document ID based on the current timestamp
      // const timestamp = Date.now().toString();
      firebase
        .firestore()
        .collection('completedforms')
        .doc(EventName)
        .set({
          EventName:EventName,
          Comment: comments,
          satisfied: satisfied,
          Email: email,
          Date: new Date(),
        })
        .then(() => {
          console.log('Form item added with ID: ', EventName);
          return res.status(201).json({ message: 'Form item created successfully' });
        })
        .catch((error) => {
          console.error('Error adding Form item: ', error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
};

