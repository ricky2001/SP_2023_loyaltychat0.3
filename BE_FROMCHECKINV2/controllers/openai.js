const axios = require('axios');
require('dotenv').config();

const generateText = async () => {
  try {
    // Get your OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;

    // Specify the OpenAI API endpoint
    const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

    // Create a text prompt for the AI to complete
    const prompt = 'hi';

    // Make a POST request to the OpenAI API
    const response = await axios.post(
      apiUrl,
      {
        prompt,
        max_tokens: 50, // Adjust this to control the length of generated text
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    // Extract the generated text from the response
    const generatedText = response.data.choices[0].text;

    return generatedText;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error generating text');
  }
};

module.exports = {
  generateText,
};


// const { Configuration, OpenAIApi } = require("openai");

// const config = new Configuration({
//   apiKey: "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",
// });

// const openai = new OpenAIApi(config);

// exports.openai = (req, res) => {
//   const { message } = req.body;

//   const response = openai.createChatCompletion(
//     {
//       model: 'gpt-3.5-turbo',
//       stream: true,
//       prompt: {message},
//       max_tokens: 256,
//       temperature: 0.7,
//     });

//   console.log(response.data);
  
// };


