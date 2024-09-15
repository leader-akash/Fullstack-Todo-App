const mongoose = require("mongoose");

const connectToMongoDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('connected to mongodb')
    }
    catch(err){
        console.log('err in connection mongodb', err.message);
    }

}

module.exports = {connectToMongoDb}