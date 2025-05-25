import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Add this
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import mainRouter from './routes/mainRouter.js';
import userRouter from './routes/userRouter.js'; // Add this
import { errorResponse } from './middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:3000',
    'https://library-frontend.netlify.app',
    process.env.FRONTEND_URL
].filter(Boolean);

// In app.js
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
        
        if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Authorization'],
    maxAge: 86400
}));

app.use('/api/users/login', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit to 100 requests
}));

dotenv.config();

app.use(cookieParser()); // Add this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', mainRouter);
app.use('/api/users', userRouter); // Mount userRouter

// Static files (after API routes)
app.use(express.static(path.join(__dirname, '../frontend')));

// SPA routing (exclude API routes)
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

app.use(errorResponse)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});