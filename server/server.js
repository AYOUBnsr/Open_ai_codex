import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Use your Google API key here
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Gemini model

const app = express();

// Enable CORS for your frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend's URL if different
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello from Gemini AI!',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // Send prompt to Gemini API and get response
    const result = await model.generateContent(prompt);

    res.status(200).send({
      bot: result.response.text(), // Get response from Gemini model
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));
