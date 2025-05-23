import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Add this
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import mainRouter from './routes/mainRouter.js';
import userRouter from './routes/userRouter.js'; // Add this

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// CORS configuration
app.use(cors({
  origin: 'https://univ-library.netlify.app',
  credentials: true
}));

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'CORS is working!' });
});

// Other middlewares
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length'],
    maxAge: 86400
}));

app.use('/api/user/login', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit to 100 requests
}));

dotenv.config();

app.use(cookieParser()); // Add this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', mainRouter);
app.use('/api/user', userRouter); // Mount userRouter

// Static files (after API routes)
//app.use(express.static(path.join(__dirname, '../frontend')));

// SPA routing (exclude API routes)
//app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
//});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});