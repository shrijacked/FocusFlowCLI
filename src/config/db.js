const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();


const mongoURI = process.env.MONGO_URI;


const connectToDb = async () => {
    try {
        
        await mongoose.connect(mongoURI, {
            
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        
        console.error('MongoDB connection error:', err);
    }
};

// handle mongoose connection events
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
});

// handle process termination and close mongoose connection gracefully
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
});


module.exports = connectToDb;