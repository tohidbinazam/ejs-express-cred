const mongoose = require('mongoose')


const mongoDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_STRING)
        console.log(`MongoDB connect successfully`.bgCyan);
    } catch (error) {
        console.log(error.message);
    }
} 


module.exports = mongoDB