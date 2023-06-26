const apiKey = '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';
const prompt = 'horse on the moon';

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function aa(){
    return await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
}


aa()