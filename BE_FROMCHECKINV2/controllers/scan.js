const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.scan = (req, res) => {
    console.log('start service');
    firebase.firestore().collection('users').where('email', '==', req.body.emailuser).get()
        .then((querySnapshot2) => {
            querySnapshot2.forEach((doc1) => {
                firebase.firestore().collection('eventcheckin').add({
                    emailuser: req.body.emailuser,
                    scanqr: req.body.scanqr,

                })
            })

        });
};