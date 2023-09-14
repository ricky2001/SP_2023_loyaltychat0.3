const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.item = (req, res) => {
    let err = '';
    if (!req.body.Email||!req.body.ItemId ||!req.body.ItemName || !req.body.ItemPrice || !req.body.ItemTotal){
      return res.status(422).json({
        Email:"Invalid user",
        ItemId:"Items are not found",
        ItemName:"Items are not found",
        ItemPrice:"Items are not found",
        ItemTotal:"Items are not found",
      });
    }
    // if (!req.body.ItemId||!req.body.ItemTotal ||!req.body.ItemImg || !req.body.ItemName || !req.body.ItemPrice) {
    //   return res.status(422).json({
    //     ItemId:"Item id is required",
    //     ItemImg: "Image is required",
    //     ItemName: "Item name is required",
    //     ItemPrice: "Item price is required",
    //     ItemTotal:"Item total is required",
    //   });
    // }

    // // save rewarditem to base
    // firebase.firestore().collection('rewarditem').add({
    //     ItemImg: req.body.ItemImg,
    //     ItemName: req.body.ItemName,
    //     ItemPrice: req.body.ItemPrice,
    //     ItemId: req.body.ItemId,
    //     ItemTotal: req.body.ItemTotal,
        
    //   })
    //     .then((docRef) => {
    //       console.log('Document written with ID: ', docRef.id);
    //     })
    //     .catch((error) => {
    //         err = error
    //       console.error('Error adding document: ', error);
    //     });

        firebase.firestore().collection('rewardexchange').add({
          email:req.body.email,
          itemid: req.body.itemid,
          itemname: req.body.itemname,
          itemprice: req.body.itemprice,
          total: req.body.total,
          
        })
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
          })
          .catch((error) => {
              err = error
            console.error('Error adding document: ', error);
          });

        // find user data and update exchange

        firebase.firestore().collection('users').where('email', '==', req.body.email).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const oldPoints = doc.data().points;
              const newPoints = req.body.itemprice * req.body.total;
              const pointsDiff = oldPoints * newPoints;
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


  //         firebase.firestore().collection('users').where('email', '==', 'email').get()
  // .then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     const oldPoints = doc.data().points;
  //     const newPoints = req.body.starConsign;
  //     const totalPoints = oldPoints + newPoints;
  //     doc.ref.update({
  //       points: totalPoints,
  //     })
  //       .then(() => {
  //         console.log('Points email to updated successfully');
  //       })
  //       .catch((error) => {
  //           err = error
  //         console.error('Error email to updating points: ', error);
  //       });
  //   });
  // })
  // .catch((error) => {
  //   err = error
  //   console.error('Error email to getting documents: ', error);
  // });
  // return res.status(200).json({ status: 'success', code: '200'});
     
  firebase.firestore().collection('rewarditem').where('ItemId', '==', req.body.itemid).get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const oldTotal = doc.data().ItemTotal;
        const newTotal = req.body.total;
        const TotalDiff = oldTotal - newTotal;
        doc.ref.update({
          ItemTotal: TotalDiff,
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

  };
  // expoers.itemshow=(req, res)=>{
  //   let err='';
  //   if (!req.body.Email||!req.body.ItemId ||!req.body.ItemName || !req.body.ItemPrice || !req.body.ItemTotal){
  //     return res.status(422).json({
  //       ItemId:"Items are not found",
  //       ItemImg:"Items are not found",
  //       ItemName:"Items are not found",
  //       ItemPrice:"Items are not found",
  //       ItemTotal:"Items are not found",
  //     });
  //   }

  //   firebase.firestore().collection('rewarditem').add({
  //     ItemId: req.body.ItemId,
  //     ItemImg: req.body.ItemImg,
  //     ItemName: req.body.ItemName,
  //     ItemPrice: req.body.ItemPrice,
  //     ItemTotal: req.body.ItemTotal,
      
  //   })
  //     .then((docRef) => {
  //       console.log('Document written with ID: ', docRef.id);
  //     })
  //     .catch((error) => {
  //         err = error
  //       console.error('Error adding document: ', error);
  //     });

     

  // };


  exports.getUserRewardExchange = (req, res) => {
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
  