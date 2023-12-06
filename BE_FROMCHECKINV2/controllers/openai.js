const openAI = require("openai");
require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;

exports.getaiMessage = async (req, res) => {
  const reqobj = req.body;
  // console.log("test######:"+reqobj.message);

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      "model": process.env.JOB_ID,
      "messages": [{"role": "assistant", "content": "I am a helpful assistant at ATA IT Limited Thailand company."},
      {"role": "assistant", "content": "Yes, I know everything about company policies, leaving policies and benefit package of all employees, Therefore, answer the question with the correct answer that matches the answer given. "},
      {"role": "user", "content": reqobj.message}],
      "temperature": 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });

    // console.log(response.data);
    res.json({
        messages: response.data.choices[0].message,
      });
  } catch (error) {
    // console.error('Error calling OpenAI API:', error);
  }
}



