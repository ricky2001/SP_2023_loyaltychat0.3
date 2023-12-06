const firebase = require("./../config/firebase");
const admin = require("./../config/firebaseadmin");

exports.names = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const email = decodedToken.email;

            firebase
                .firestore()
                .collection("users")
                .where("email", "==", email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const name = doc.data().name;
                        return res.status(200).json({ name: name });
                    });
                })
                .catch((error) => {
                    // console.error("Error retrieving user name: ", error);
                    return res.status(500).json({ error: error.message });
                });
        })
        .catch((error) => {
            // console.error("Error verifying ID token: ", error);
            return res.status(401).json({ error: error.message });
        });
};