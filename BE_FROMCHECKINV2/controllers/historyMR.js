// const firebase = require("./../config/firebase");
// const admin = require("./../config/firebaseadmin");

// exports.historyMR = async (req, res) => {
//     try {
//         console.log(email);
//         const email = req.body.email;
//         const snapshot = await firebase.firestore()
//             .collection('rewardexchange')
//             .where('emailuser', '==', email)
//             .get();

//         const data = snapshot.docs.map((doc) => {
//             const docData = doc.data();

//             return {
//                 id: doc.id,
//                 email: docData.emailuser,
//                 name: docData.name,
//                 date: formatDate(docData.date),
//                 department: docData.department,
//                 itemname: docData.itemname,
//                 itemtotal: docData.itemtotal,
//                 img: docData.img,
//                 status: docData.status,
//             };
//         });

//         res.json(data);
//     } catch (error) {
//         console.error('Error retrieving data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };
    
//     function formatDate(timestamp) {
//       const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
//       const dd = String(date.getDate()).padStart(2, '0');
//       const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
//       const yyyy = date.getFullYear()-1969;
//       const hours = String(date.getHours()).padStart(2, '0');
//       const minutes = String(date.getMinutes()).padStart(2, '0');
//       const seconds = String(date.getSeconds()).padStart(2, '0');
//       return `${dd}/${mm}/${yyyy} ${hours}:${minutes}:${seconds}`;
//     }


const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.historyMR = async (req, res) => {
  try {
    const email = req.body.emailUse;
    const snapshot = await firebase
      .firestore()
      .collection('rewardexchange')
      .where('emailuser', '==', email)
      .get();

    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();

      return {
        id: doc.id,
        email: docData.emailuser,
        name: docData.name,
        date: formatDate(docData.date),
        department: docData.department,
        itemname: docData.itemname,
        itemtotal: docData.itemtotal,
        img: docData.img,
        status: docData.status,
      };
    });

    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
};

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = date.getFullYear() - 1969;
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} ${hours}:${minutes}:${seconds}`;
}