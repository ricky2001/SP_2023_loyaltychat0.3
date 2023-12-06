const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.getUserDateCheckIn = (req, res) => {
    // console.log('start service');
    const token = req.headers.authorization.split(" ")[1];
    let found;
    const data = [];
    admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const email = decodedToken.email;

      let found = false;
      const data = [];
      firebase.firestore().collection('checkin').where('email', '==', email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data());
            const dateObj = new Date(doc.data().dateCheckIn);
            dateObj.setDate(dateObj.getDate() - 1);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            data.push(formattedDate);
            found = true;
          });
          if (found) {
            return res.status(200).json({dateHistory : data.sort((a, b) => new Date(a) - new Date(b)) , emailUser : email , status: "get Date History Success" , code:"200" });
          } else {
            return res.status(200).json({dateHistory :[], emailUser : email , status: "get Date History Success" , code:"200" });
          }
        })
        .catch((error) => {
          // console.error('Error getting documents: ', error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
  };
  


  exports.updatedCheckIn = (req, res) => {
  // save dateCheckIn to base
  const token = req.headers.authorization.split(" ")[1];
  const timestamp = new Date().getTime();

// Create a new Date object using the timestamp
const date = new Date(timestamp);

// Format the time with time zone information
const options = { hour12: true, hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Bangkok' };
const formattedTime = date.toLocaleString('en-US', options);

// console.log("Thailand Time:", formattedTime);

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const email = decodedToken.email;

      firebase.firestore().collection('checkin').add({
        dateCheckIn: req.body.dateCheckIn,
        email: email,
        time:formattedTime
      })
        .then((docRef) => {
          // console.log('Document checkIn written with ID: ', docRef.id);
          return res.status(200).json({status:"success" , code:"200"})
        })
        .catch((error) => {
          // console.error('Error adding document: ', error);
          return res.status(500).json({ error: error.message });
        });
        
        firebase.firestore().collection('users').where('email', '==',email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const oldPoints = doc.data().points;
            const newPoints = req.body.points;
            const totalPoints = oldPoints + newPoints;
            doc.ref.update({
              points: totalPoints,
            })
              .then(() => {
                // console.log('Points email to updated successfully');
              })
              .catch((error) => {
                  err = error
                // console.error('Error email to updating points: ', error);
              });
          });
        })
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
  }