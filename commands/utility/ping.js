
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
    const msg = await message.channel.send("Pinging...");

    const apiLatency = Math.round(client.ws.ping);
    const botLatency = msg.createdTimestamp - message.createdTimestamp;

    msg.edit(`Pong! API latency is **${apiLatency}ms**, bot latency is **${botLatency}ms**`);

};

module.exports.help = {
    aliases: [],
    name: 'ping',
    description: 'Pong',
    usage: config.prefix + 'ping',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'utility',
    disable: false,
    cooldown: 1000,
};