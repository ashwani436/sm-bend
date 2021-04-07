import mongoose from 'mongoose';
import 'dotenv/config';

// to filter out deprecated warnings
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

// mongoose connection
export const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECT_URL, dbOptions, () => {console.log("Connected to MongoDb successfully!")});
    } catch (e){
        console.log(`Error : ${e}`)
    }
}