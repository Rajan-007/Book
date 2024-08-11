const mongoose = require('mongoose');

// 
const connectDB = async () => {
    try {
        // Connect to the MongoDB without the deprecated options
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exiting the process with failure
    }
};

module.exports = connectDB;
