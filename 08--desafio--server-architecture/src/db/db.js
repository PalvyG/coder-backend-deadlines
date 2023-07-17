import mongoose from 'mongoose';
import 'dotenv/config'

const connectionString = process.env.MONGODB_URL

try {
    await mongoose.connect(connectionString)
    console.log('Connection with MongoDB Atlas database established successfully')
} catch (err) {
    console.log(err)
}