const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");


//rewaed exchanges
exports.itemexchange = (req, res) => {
  let err = '';

  firebase.firestore().collection('rewarditem').where('itemid', '==', req.body.itemid).get()
    .then((querySnapshot1) => {
      querySnapshot1.forEach((doc1) => {
        const OldPoints1 = doc1.data().itemtotal;
        const NewPoints1 = req.body.itemTotal;
        const TotalPoints = OldPoints1 - NewPoints1;
        if(TotalPoints<0){
          return res.status(500).json({
            status: "Out of stock",
            code: "500"
          });
        }
        firebase.firestore().collection('users').where('email', '==', req.body.emailuser).get()
        .then((querySnapshot2) => {
          querySnapshot2.forEach((doc2) => {
            const oldPoints2 = doc2.data().points;
            const newPoints2 = doc1.data().itemprice;
            const pointsDiff = oldPoints2 - newPoints2;
            if(pointsDiff < 0) {
              return res.status(500).json({
                    status: "You stars not enough points",
                    code: "500"
                  });
            }
            firebase.firestore().collection('rewardexchange').add({
              emailuser: req.body.emailuser,
              itemid: req.body.itemid,
              itemname: doc1.data().itemname,
              itemtotal: req.body.itemTotal,
              totalprices: doc1.data().itemprice,
            })
              .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
                doc2.ref.update({
                  points: pointsDiff,
                })
                  .then(() => {
                    console.log('Points from updated successfully');
                  })
                  .catch((error) => {
                    err = error
                    console.error('Error email to updating points: ', error);
                  });
                  doc1.ref.update({
                    itemtotal: TotalPoints,
                  })
                    .then(() => {
                      console.log('Item to updated successfully');
                    })
                    .catch((error) => {
                      err = error
                      console.error('Error item to updating points: ', error);
                    });
                    return res.status(200).json({ status: 'success', code: '200' });
              })
              .catch((error) => {
                err = error
                console.error('Error adding document: ', error);
              });
           
          });
        })
        .catch((error) => {
          err = error
          console.error('Error email to getting documents: ', error);
        });
       
      });
    })
    .catch((error) => {
      err = error
      console.error('Error item to getting documents: ', error);
    });

};


exports.getUserItemExchange = (req, res) => {
      firebase.firestore().collection('rewarditem').get()
        .then((querySnapshot) => {
          let dataitem = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            if (doc.data()) {
              dataitem.push(doc.data());
            }
          });
          return res.status(200).json(dataitem);
        })
        .catch((error) => {
          console.error('Error getting documents: ', error);
        });
};

// Create a new item
exports.createReward = (req, res) => {
  const { id,name,detail,price,total } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const img = req.file; 
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const email = decodedToken.email;

      // Create a new item
       // Upload the image to Firebase Storage
       const storageRef = firebase.storage().ref(`Reward/${img.filename}`);
       storageRef.put(img.buffer).then((snapshot) => {
         console.log('Image uploaded to Firebase Storage.');
 
         // Get the image download URL
         storageRef.getDownloadURL().then((imgUrl) => {
           // Create a new item in Firestore with the image URL
           firebase
             .firestore()
             .collection('rewarditem')
             .add({
               itemid: id,
               Adder: email,
               itemname: name,
               itemdetail: detail,
               itemprice: price,
               itemtotal: total,
               itemimg: imgUrl, // Use the image URL here
             })
             .then((docRef) => {
               console.log('Form item added with ID: ', docRef.id);
               return res.status(201).json({ message: 'Form item created successfully' });
             })
             .catch((error) => {
               console.error('Error adding form item: ', error);
               return res.status(500).json({ message: 'Internal server error' });
             });
         });
       });
     })
     .catch((error) => {
       res.status(401).json({ error: error.message });
     });
 };

// Update a item by ID
exports.updateRe = (req, res) => {
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