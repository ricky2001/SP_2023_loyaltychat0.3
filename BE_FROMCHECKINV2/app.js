const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const functions = require('firebase-functions');

// Routes
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use(cors()); 

// Routes
app.use("/api", authRoutes);

// PORT
const port = 3000;

// Starting a server
app.listen(port, () => {
  console.log(`Start server : ${port}`);
});



//for deploy
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require('cors');
// const app = express();
// const functions = require('firebase-functions');
// const authRoutes = require("./routes/auth");

// app.use(bodyParser.json());
// app.use(cors()); 

// // Routes
// app.use("/api", authRoutes);

// // exports.api = functions.https.onRequest(async (req, res) => {
// //   try {
   
// //     // Middlewares

// // // PORT
// // // const port = 3000;

// // // // Starting a server
// // // app.listen(port, () => {
// // //   console.log(`Start server : ${port}`);
// // // });
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// exports.api = functions.https.onRequest(app);