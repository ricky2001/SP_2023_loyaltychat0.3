const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
require("firebase/compat/firestore");
 require("firebase/compat/storage");






// Add Firebase SDK Snippet
const firebaseConfig = {
  databaseURL: "https://loyalty-e5fdd.firebaseio.com",
  apiKey: "AIzaSyDI4j1k-6XwrWsRHZnpU2rsZL92NNRG5D8",
  authDomain: "loyalty-e5fdd.firebaseapp.com",
  projectId: "loyalty-e5fdd",
  storageBucket: "loyalty-e5fdd.appspot.com",
  messagingSenderId: "264155182975",
  appId: "1:264155182975:web:e266f70c5684c1c4a10c4a",
  measurementId: "G-0WEHK8LFCL",
};

firebase.initializeApp(firebaseConfig);



module.exports = firebase;

