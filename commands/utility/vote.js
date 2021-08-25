const config = require('../../util/config.json');

module.exports.run = async (client, message) => {
	const { MessageButton } = require('discord.js');

	const btnInvite = new MessageButton()
		.setLabel('Vote!')
		.setStyle('LINK')
		.setURL('https://top.gg/bot/809496186905165834/vote');

	message.channel.send({ content: 'Get some rewards for voting for me on top.gg! This also supports the bot!', components: [{ type: 1, components: [btnInvite] }] });
};

module.exports.help = {
	aliases: [],
	name: 'vote',
	description: 'Vote for da bot',
	usage: config.prefix + 'vote',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'utility',
	disable: false,
	cooldown: 1000,
};
