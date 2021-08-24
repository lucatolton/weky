const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	const msg = args.slice(0).join(' ');
	let Case = '';
	if (!msg) return message.channel.send({ content: 'Please Give Your Message!' });

	for (const i in msg) {
		const Random = await Math.floor(Math.random() * 2);
		Case += Random == 1 ? msg[i].toLowerCase() : msg[i].toUpperCase();
	}

	return message.channel.send({ content: Case });

};

module.exports.help = {
	aliases: [],
	name: 'mock',
	description: 'Mock.',
	usage: config.prefix + 'mock %text%',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 1000,
};

