const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();


// Routes
const authRoutes = require("./routes/auth");


app.use(bodyParser.json({ extended: false,limit:'10mb' }));
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

// app.use(bodyParser.json({ extended: false ,limit:'10mb'}));
// app.use(cors()); 

// // Routes
// app.use("/api", authRoutes);

// exports.api = functions.https.onRequest(app);