const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.scan = async (req, res) => {
    
    firebase.firestore().collection('users').where('email', '==', req.body.emailuser).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

        
        if (querySnapshot.empty) {
            return res.status(404).json({
                status: "User not found",
                code: "404"
            });
        }

        // const doc = querySnapshot.docs[0];
        const oldPoints = doc.data().points;
        const newPoints = oldPoints + 1;
        const email = req.body.emailuser; // Get user email from the user document
        const time = new Date();
        const event = req.body.event;
        // const formattedDate = time.toISOString();
        

        if (email == null || event == null) {
            return res.status(500).json({
                status: "Invalid email or time",
                code: "500"
            });
        }

        // Adding event check-in record
        // firebase.firestore().collection('eventcheckin').doc(`${event}_${formattedDate}`).set({
            firebase.firestore().collection('eventcheckin').add({
            email: email,
            time: time,
            star: 1,
            eventname: event,
        })
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);

            // Update user's points
            doc.ref.update({
                points: newPoints
            }).then(() => {
                console.log('Points updated successfully');
                return res.status(200).json({
                    status: 'success',
                    code: '200'
                });
            })
            .catch((error) => {
                console.error('Error updating points: ', error);
                return res.status(500).json({
                    status: 'Error updating points',
                    code: '500'
                });
            });
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
            return res.status(500).json({
                status: 'Error adding document',
                code: '500'
            });
        });
    })
    })
    .catch((error) => {
        console.error('Error finding user: ', error);
        return res.status(500).json({
            status: 'Error finding user',
            code: '500'
        });
    });
        

};
