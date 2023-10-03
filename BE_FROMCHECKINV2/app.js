const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

// Routes
const authRoutes = require("./routes/auth");

// Middlewares
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
