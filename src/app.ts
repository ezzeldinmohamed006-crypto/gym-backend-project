import express from 'express';
import dotenv from 'dotenv';
import sessionRoutes from './routes/sessionRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Gym Booking API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});