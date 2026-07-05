import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import levelRoutes from './routes/levelRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import seedRoutes from './routes/seedRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins for easy frontend communication (can restrict later in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// API Routes
app.use('/api/levels', levelRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/seed', seedRoutes);

// General translation proxy endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, from = 'auto', to = 'vi' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, error: 'Text to translate is required' });
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Translate API responded with status ${response.status}`);
    }
    const data = await response.json();

    if (data && data[0]) {
      const translatedText = data[0]
        .map(item => item[0])
        .filter(Boolean)
        .join('');
      return res.json({ success: true, translatedText });
    }

    res.status(500).json({ success: false, error: 'Could not parse translation response' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Verba API is running smoothly!' });
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
