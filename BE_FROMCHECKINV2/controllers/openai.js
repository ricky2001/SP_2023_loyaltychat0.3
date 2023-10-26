const openAI = require("openai");
require('dotenv').config();

const openai = new openAI({
  organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getaiMessage = async (req, res) => {

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 256,
    temperature: 0.7,
  });
  
  res.json({
    messages: response.choices[0].text,
  });
}




