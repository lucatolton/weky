const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	const query = args.slice(0).join('+');
	if (!query) return message.reply('What to search?');
	message.channel.send({ content: `https://lmgtfy.app/?q=${query}` });
};

module.exports.help = {
	aliases: ['lmgtfy'],
	name: 'google',
	description: 'Googling your text.',
	usage: config.prefix + 'google %text%',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 1000,
};
