import mongoose from 'mongoose';
import config from '../config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;