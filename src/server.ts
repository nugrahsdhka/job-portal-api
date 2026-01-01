import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send({
    message: "API Job Portal Ready! 🚀",
    status: "success"
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});