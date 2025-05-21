import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { model, messages } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OpenAI API key');
      return res.status(500).json({ error: 'Missing OpenAI API key' });
    }
    if (!model || !messages) {
      console.error('Missing model or messages in request');
      return res.status(400).json({ error: 'Missing model or messages in request' });
    }

    // Validate message roles
    const validRoles = ['system', 'assistant', 'user', 'function', 'tool', 'developer'];
    const invalidMessage = messages.find(msg => !validRoles.includes(msg.role));
    if (invalidMessage) {
      console.error('Invalid message role:', invalidMessage.role);
      return res.status(400).json({ 
        error: `Invalid message role: ${invalidMessage.role}. Supported roles are: ${validRoles.join(', ')}` 
      });
    }

    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    if (!completion.choices || !completion.choices[0] || !completion.choices[0].message) {
      console.error('No valid response from OpenAI', completion);
      return res.status(500).json({ error: 'No valid response from OpenAI' });
    }

    res.json({
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while processing your request'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 