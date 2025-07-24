const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('../config/connectDB');
const userRoute = require('../routes/userRoutes');
const cartRoutes = require('../routes/cartRoutes');
const serverless = require('serverless-http');

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://lexme-e-com-front.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from origin: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

connectDb();

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.use('/api/users', userRoute);
app.use('/api/users', cartRoutes);

module.exports = app;
module.exports.handler = serverless(app);