const openAI = require("openai");
require('dotenv').config();
const axios = require('axios');

// const openai = new openAI({
//   organization: process.env.OPENAI_ORG_KEY,
//   apiKey: process.env.OPENAI_API_KEY,
// });

// Set your OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

// Define the prompt for your request
// const prompt = "Translate the following English text to French: 'Hello, how are you?'";


exports.getaiMessage = async (req, res) => {
  const reqobj = req.body;
  console.log("test######:"+reqobj.message);

  //   const response = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: "What is ATA IT Limited?" }],
  //     max_tokens: 256,
  //     temperature: 0.7,
  //   });

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      "model": process.env.JOB_ID,
      "messages": [{"role": "assistant", "content": "I am a helpful assistant at ATA IT Limited Thailand."},
      {"role": "user", "content": "You are one of the HR department's staffs"},
      {"role": "assistant", "content": "Yes, I know everything about company policies, leaving policies and benefit package of all employees, Therefore, answer the question with the correct answer that matches the answer given. "},
      {"role": "user", "content": reqobj.message}],
      "temperature": 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });

    console.log(response.data);
    res.json({
        messages: response.data.choices[0].message,
      });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }


  // res.json({
  //   messages: response.choices[0].text,
  // });
}



