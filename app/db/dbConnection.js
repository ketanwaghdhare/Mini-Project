const mongoose = require("mongoose");
const MONGO_PASS = process.env.MONGODB_PASSWORD;

async function connectDB(){
    try{
        const connection = await mongoose.connect(`mongodb+srv://monojit9158592447:${MONGO_PASS}@cluster0.ubti77q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('MongoDB Connected!');
    }
    catch(err){
        console.log('MongoDB Connection Error!')
        console.log(err)
    }

    
}

module.exports = connectDB;