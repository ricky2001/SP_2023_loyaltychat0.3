const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.scan = async (req, res) => {
    
    firebase.firestore().collection('users').where('email', '==', req.body.emailuser).get()
    .then((querySnapshot) => {
        if (querySnapshot.empty) {
            return res.status(404).json({
                status: "User not found",
                code: "404"
            });
        }

        const doc = querySnapshot.docs[0];
        const oldPoints = doc.data().points;
        const newPoints = oldPoints + 1;
        const email = req.body.emailuser; // Get user email from the user document
        const time = new Date();
        const eventname = req.body.event;

        if (email == null || time == null) {
            return res.status(500).json({
                status: 'Error finding user',
                code: '500',
                error: error.message // Add the error message for more details
            });
        }

        // Adding event check-in record
        firebase.firestore().collection('eventcheckin').add({
            eventName: eventname,
            email: email,
            time: time,
            star: 1,
        })
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);

            // Update user's points
            docRef.update({
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
    .catch((error) => {
        console.error('Error finding user: ', error);
        return res.status(500).json({
            status: 'Error finding user',
            code: '500'
        });
    });
        

};
