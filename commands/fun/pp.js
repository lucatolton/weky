const config = require('../../util/config.json');

module.exports.run = async (client, message) => {
	message.channel.send({ content: '8' + ('='.repeat(Math.floor(Math.random() * 20))) + '>' });
};

module.exports.help = {
	aliases: ['pp', 'ppsize'],
	name: 'penis',
	description: 'PP.',
	usage: config.prefix + 'pp',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 1000,
};
