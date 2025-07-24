const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/connectDB');
const userRoute = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use express.json to parse JSON bodies
app.use(express.json());

// ✅ CORS configuration
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

// ✅ Use CORS middleware
app.use(cors(corsOptions));

// ✅ Handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions));

// ✅ Connect MongoDB
connectDb();

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.use('/api/users', userRoute);
app.use('/api/users', cartRoutes);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
