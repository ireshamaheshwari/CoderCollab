const { MongoClient, ServerApiVersion } = require("mongodb");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectToDatabase = async () => {
    // console.log(MONGO_DB_URL);
    try {
        await mongoose.connect(MONGO_DB_URL).then( () => {
            console.log(
                "Pinged your deployment. You successfully connected to MongoDB!"
            );
        })
    } catch (e) {
        console.error(e);
    }
};

module.exports = { connectToDatabase };
