const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided.' });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "gpt-4",
    });

    const reply = chatResponse.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Failed to contact AI' });
  }
});

app.listen(port, () => {
  console.log(`AI server is up on port ${port}`);
});
