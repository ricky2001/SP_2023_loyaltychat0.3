const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.consign = (req, res) => {
    let err = '';
    if (!req.body.emailFrom || !req.body.emailTo || !req.body.starConsign) {
      return res.status(422).json({
        emailFrom: "email sender is required",
        emailTo: "email received is required",
        starConsign: "startConsign is required"
      });
    }

    if(req.body.emailFrom == req.body.emailTo ){
        return res.status(400).json({
          status:"emailFrom must same Email To",
          code:"400"
        })
    }
    // save consign to base
    firebase.firestore().collection('consign').add({
        emailFrom: req.body.emailFrom,
        emailTo: req.body.emailTo,
        starConsign: req.body.starConsign,
        text: req.body?.text,
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
            err = error
          console.error('Error adding document: ', error);
        });
        // find user data and update consign

        firebase.firestore().collection('users').where('email', '==', req.body.emailFrom).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const oldPoints = doc.data().points;
              const newPoints = req.body.starConsign;
              const pointsDiff = oldPoints-newPoints;
              doc.ref.update({
                points: pointsDiff,
              })
                .then(() => {
                  console.log('Points from updated successfully');
                })
                .catch((error) => {
                    err = error
                  console.error('Error email to updating points: ', error);
                });
            });
          })
          .catch((error) => {
            err= error
            console.error('Error email to getting documents: ', error);
          });


          firebase.firestore().collection('users').where('email', '==', req.body.emailTo).get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const oldPoints = doc.data().points;
      const newPoints = req.body.starConsign;
      const totalPoints = oldPoints + newPoints;
      doc.ref.update({
        points: totalPoints,
      })
        .then(() => {
          console.log('Points email to updated successfully');
        })
        .catch((error) => {
            err = error
          console.error('Error email to updating points: ', error);
        });
    });
  })
  .catch((error) => {
    err = error
    console.error('Error email to getting documents: ', error);
  });
  return res.status(200).json({ status: 'success', code: '200'});
          

  };


  exports.getUserPointConsign = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const email = decodedToken.email;
      firebase.firestore().collection('users').where('email', '==', email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            if(doc.data()){
              return res.status(200).json(doc.data())
            }
          });
        })
        .catch((error) => {
          console.error('Error getting documents: ', error);
        });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
};
  