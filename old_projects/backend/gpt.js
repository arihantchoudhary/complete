import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const stream = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [ ... ],
  });
  
  for await (const part of stream) {
    process.stdout.write(part.choices[0].delta?.content || "");
  }