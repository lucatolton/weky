require('dotenv').config()

const Weky = require('./util/Weky');
const client = new Weky({ intents: 32767 });

client.born(process.env.token, process.env.MONGO)