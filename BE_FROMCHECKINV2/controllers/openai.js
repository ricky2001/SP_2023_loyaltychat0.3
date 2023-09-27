const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

exports.openai = (req, res) => {
  const { message } = req.body;

  const response = openai.createChatCompletion(
    {
      model: 'gpt-3.5-turbo',
      stream: true,
      prompt: {message},
      max_tokens: 256,
      temperature: 0.7,
    });

  console.log(response.data);
  
};


