const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");
const fs = require('fs');
// const fs = require('fs').promises;
const ba64 = require("ba64");
const sharp = require('sharp');
const sizeOf = require('image-size');


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
            const newPoints2 = doc1.data().itemprice*req.body.itemTotal;
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
              date: new Date(),
              img: doc1.data().itemimg,
              status:"Waiting for HR",
              name: doc2.data().name,
              department: doc2.data().department
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
exports.createReward = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    // Validate the request
    const { id, name, detail, price, total, img } = req.body;
    if (!id || !name || !detail || !price || !total || !img) {
      console.error('Error in createReward: Invalid request. Please provide all required fields and an image.');
    return res.status(403).json({ error: 'Invalid request. Please provide all required fields and an image.' });
  }

    // Extract the image buffer from the request body
    // const imgBuffer = Buffer.from(img, 'base64');

    // Authentication
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    const fileExtension = img.split(';')[0].split('/')[1];

    // Generate a unique filename for the image
    const imgFilename = `Reward/${Date.now()}_${Math.floor(Math.random() * 1000000)}.${fileExtension}`;

    // Write the image buffer to a temporary file
    ba64.writeImageSync(`tmp`, img);

    // Upload the temporary file to Firebase Storage
    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child(imgFilename);
    const snapshot = await imagesRef.put(fs.readFileSync(`/tmp.${fileExtension}`));

    // Delete the temporary file after upload
    fs.unlinkSync(`/tmp.${fileExtension}`);

    // Get the image download URL
    const imgUrl = await imagesRef.getDownloadURL();

    // Create a new item in Firestore with the image URL
    const docRef = await firebase.firestore().collection('rewarditem').add({
      itemid: parseInt(id),
      Adder: email,
      itemname: name,
      itemdetail: detail,
      itemprice: parseInt(price),
      itemtotal: parseInt(total),
      itemimg: imgUrl,
    });

    console.log('Form item added with ID: ', docRef.id);
    return res.status(201).json({ message: 'Form item created successfully' });
  } catch (e) {
    console.error('Error in createReward:', e);
    return res.status(400).json({ message: 'Bad request', error: e.message });
  }
};
// exports.createReward = async (req, res) => {
//   try {
//     console.log('Request Body:', req.body);
//     // Validate the request
//     const { id, name, detail, price, total, img } = req.body;
//     if (!id || !name || !detail || !price || !total || !img) {
//       console.error('Error in createReward: Invalid request. Please provide all required fields and an image.');
//       return res.status(403).json({ error: 'Invalid request. Please provide all required fields and an image.' });
//     }

//     // Authentication
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const email = decodedToken.email;

//     const fileExtension = img.split(';')[0].split('/')[1];

//     // Generate a unique filename for the image
//     const imgFilename = `Reward/${Date.now()}_${Math.floor(Math.random() * 1000000)}.${fileExtension}`;

//     // Convert base64 image to buffer
//     const imgBuffer = Buffer.from(img, 'base64');

//     // Upload the image buffer to Firebase Storage
//     const storageRef = firebase.storage().ref();
//     const imagesRef = storageRef.child(imgFilename);
//     const snapshot = await imagesRef.put(imgBuffer);

//     // Get the image download URL
//     const imgUrl = await imagesRef.getDownloadURL();

//     // Create a new item in Firestore with the image URL
//     const docRef = await firebase.firestore().collection('rewarditem').add({
//       itemid: parseInt(id),
//       Adder: email,
//       itemname: name,
//       itemdetail: detail,
//       itemprice: parseInt(price),
//       itemtotal: parseInt(total),
//       itemimg: imgUrl,
//     });

//     console.log('Form item added with ID: ', docRef.id);
//     return res.status(201).json({ message: 'Form item created successfully' });
//   } catch (e) {
//     console.error('Error in createReward:', e);
//     return res.status(400).json({ message: 'Bad request', error: e.message });
//   }
// };
// exports.createReward = async (req, res) => {
//   try {
//     console.log('Request Body:', req.body);
//     // Validate the request
//     const { id, name, detail, price, total, img } = req.body;
//     if (!id || !name || !detail || !price || !total || !img) {
//       console.error('Error in createReward: Invalid request. Please provide all required fields and an image.');
//       return res.status(403).json({ error: 'Invalid request. Please provide all required fields and an image.' });
//     }

//     // Authentication
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const email = decodedToken.email;

//     // Decode base64 image to a buffer
//     const imgBuffer = Buffer.from(img, 'base64');

//     // Generate a unique filename for the image
//     const fileExtension = img.split(';')[0].split('/')[1];
//     const imgFilename = `Reward/${Date.now()}_${Math.floor(Math.random() * 1000000)}.${fileExtension}`;

//     // Upload the image buffer to Firebase Storage
//     const storageRef = firebase.storage().ref();
//     const imagesRef = storageRef.child(imgFilename);
//     const snapshot = await imagesRef.put(imgBuffer);

//     // Get the image download URL
//     const imgUrl = await imagesRef.getDownloadURL();

//     // Create a new item in Firestore with the image URL
//     const docRef = await firebase.firestore().collection('rewarditem').add({
//       itemid: parseInt(id),
//       Adder: email,
//       itemname: name,
//       itemdetail: detail,
//       itemprice: parseInt(price),
//       itemtotal: parseInt(total),
//       itemimg: imgUrl,
//     });

//     console.log('Form item added with ID: ', docRef.id);

//     return res.status(201).json({ message: 'Form item created successfully' });
//   } catch (e) {
//     console.error('Error in createReward:', e);
//     return res.status(400).json({ message: 'Bad request', error: e.message });
//   }
// };





// Update item reward
exports.updateReward = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { id, name, price, total, detail } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    if (id == null || name == null || price == null || total == null || detail == null) {
      return res.status(400).json({ error: 'Invalid request. Please provide all required fields.' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    // Check if the document with the specified ID exists
    const docSnapshot = await firebase.firestore().collection('rewarditem').where("itemid", "==", id).get();

    if (docSnapshot.empty) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    // Update the item
    const docRef = docSnapshot.docs[0]; // Assuming there is only one document with the specified ID
    await docRef.ref.update({
      Adder: email,
      itemname: name,
      itemdetail: detail,
      itemprice: price,
      itemtotal: total,
    });

    console.log('Form item updated with ID: ', docRef.id);
    return res.status(200).json({ message: 'Form item updated successfully' });
  } catch (error) {
    console.error('Error updating form item: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



// Delete item reward along with image in storage
exports.deleteReward = async (req, res) => {
  try {
    const { itemid } = req.body;
    
    if (!itemid) {
      return res.status(400).json({ error: 'Invalid request. Missing itemid in the request body.' });
    }

    // Check if the document with the specified ID exists
    const docSnapshot = await firebase.firestore().collection('rewarditem').where("itemid", "==", parseInt(itemid)).get();

    if (docSnapshot.empty) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    const docData = docSnapshot.docs[0].data();

    // Get the download URL of the image
    const imgUrl = docData.itemimg;

    // Get a reference to the image file in Firebase Storage
    const storageRef = firebase.storage().refFromURL(imgUrl);

    // Delete the image file
    await storageRef.delete();

    // Delete the document in Firestore
    await docSnapshot.docs[0].ref.delete();

    console.log('Item and image deleted successfully.');
    return res.status(200).json({ message: 'Item and image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting item and image:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
