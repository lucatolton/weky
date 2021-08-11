require('dotenv').config()

const Weky = require('./util/Weky');
const client = new Weky({ disableMentions: 'everyone' }, { fetchAllMembers: true });

client.born(process.env.token, process.env.MONGO);
