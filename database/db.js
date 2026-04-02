import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD; 
const NO_DB = process.env.NO_DB === 'true';

const Connection = () => {
    if (NO_DB) {
        console.log('NO_DB=true set, skipping MongoDB connection.');
        return;
    }
    const DB_URI = `mongodb://${USERNAME}:${PASSWORD}@ac-pmz4laa-shard-00-00.ibo8rgu.mongodb.net:27017,ac-pmz4laa-shard-00-01.ibo8rgu.mongodb.net:27017,ac-pmz4laa-shard-00-02.ibo8rgu.mongodb.net:27017/?ssl=true&replicaSet=atlas-1ussr2-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true });
        mongoose.set('strictQuery', false);
        console.log('Database connected sucessfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message)
    }
}

export default Connection;
