const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/connectDB');
const userRoute = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173',
    'https://lexme-e-com-front.vercel.app'
];

app.use(cors({
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error(`CORS not allowed from origin: ${origin}`));
        }
    },
    credentials: true
}
));

connectDb();

app.get('/', (req, res) => {
    res.send('Server is running successfully');
});

app.use('/api/users',userRoute);
app.use('/api/users',cartRoutes);


app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
})