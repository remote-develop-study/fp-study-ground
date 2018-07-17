import mongoose from 'mongoose';

const URI_PREFIX = 'mongodb';
const HOST = process.env.MONGO_HOST;
const PORT = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DATABASE;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;

const ENDPOINT = `${URI_PREFIX}://${HOST}:${PORT}/${dbName}`;
mongoose.connect(ENDPOINT, { user, pass });

export default mongoose;
