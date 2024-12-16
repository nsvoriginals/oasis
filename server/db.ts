import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    
    const uri: string = 'mongodb+srv://iamnsv:iamnsv@cluster0.dwbxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
   
    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

export default connectDB;
