const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Có thể bỏ qua
            useUnifiedTopology: true, // Có thể bỏ qua
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`DB connect error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
