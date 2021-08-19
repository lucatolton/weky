require('dotenv').config();
const Weky = require('./util/Weky');
const client = new Weky();

client.born(process.env.token, process.env.MONGO);