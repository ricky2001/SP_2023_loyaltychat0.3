const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

//rewaed exchanges
exports.itemexchange = (req, res) => {
  let err = '';
  // if (req.body.itemid != req.body.itemid || req.body.itemtotal > req.body.total) {
  //   return res.status(404).json({
  //     status: "Item not found",
  //     code: "404"
  //   });
  // }

  // if (req.body.itemprice <=0||req.body.itemtotal <=0) {
  //   return res.status(400).json({
  //     status: "You must select an item",
  //     code: "400"
  //   })
  // }
  // save rewardexchange to base
  

  //get rewarditem from base
  // firebase.firestore().collection('rewarditem').get({
  //   itemidm: req.body.itemid,
  //   total: req.body.itemtotal,
  //   itemprices: req.body.itemprice,
  // });

  // find user data 

 


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

//create new item
// export function addItem(item) {
//   // Push a new item to the database
//   const newItemRef = database.ref('items').push();
//   newItemRef.set(item)
//     .then(() => {
//       console.log('Item added successfully.');
//     })
//     .catch(error => {
//       console.error('Error adding item: ', error);
//     });
// }

// const newItem = {
//   itemid: 1,
//   itemname: "New Item",
//   itemprice: 20
// };

// addItem(newItem);