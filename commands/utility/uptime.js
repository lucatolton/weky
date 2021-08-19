const config = require('../../util/config.json');

module.exports.run = async (client, message) => {

	const days = Math.floor(client.uptime / 86400000);
	const hours = Math.floor(client.uptime / 3600000) % 24;
	const minutes = Math.floor(client.uptime / 60000) % 60;
	const seconds = Math.floor(client.uptime / 1000) % 60;
	message.channel.send({ content: `**__Uptime:__**\nWeky is online since ${days}**d **${hours}**h **${minutes}**m **${seconds}**s**!` });

};

module.exports.help = {
	aliases: [],
	name: 'uptime',
	description: 'Uptime of da bot',
	usage: config.prefix + 'invite',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'utility',
	disable: false,
	cooldown: 1000,
};