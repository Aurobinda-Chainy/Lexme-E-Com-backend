const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        console.log("MongoDB connected");
        console.log(`Connected to MongoDB database: ${db.name}`);
        console.log(`ReadyState: ${db.readyState}`);
    }catch(error){
        console.error("MongoDb connection error:", error.messaage);
        process.exit(1);
    }
};

module.exports = connectDB;