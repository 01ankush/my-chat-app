// chatCompletion.js

import OpenAI from 'openai';

const chatCompletion = async (prompt) => {
  const OPENAI_API_KEY = "your-api-key";
  const openai = new OpenAI({apiKey: OPENAI_API_KEY,dangerouslyAllowBrowser: true});
  const aiModel = "gpt-3.5-turbo-1106";
  const messages = [
    {
      role: "system",
      content: "You will correct the sentence grammatically."
    },
    {
      role: "user",
      content: prompt
    }
  ];

  const completion = await openai.chat.completions.create({
    model: aiModel,
    messages: messages
  });

  return completion.choices[0].message.content;
};

export default chatCompletion;
