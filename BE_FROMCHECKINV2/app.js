const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const http = require('http');
const { generateText } = require('./controllers/openai');

// Routes
const authRoutes = require("./routes/auth");

const server = http.createServer(async (req, res) => {
  if (req.url === '/generate-text') {
    try {
      // Generate text using the OpenAI API
      const generatedText = await generateText();

      // Send the generated text as the HTTP response
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(generatedText);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error generating text');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

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
