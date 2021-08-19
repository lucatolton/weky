const config = require('../../util/config.json');

module.exports.run = async (client, message) => {
	const { MessageButton, MessageEmbed } = require('discord.js');
	const embed = new MessageEmbed().addField('**Weky Bot**', 'All these links helps me to grow!');

	const btnInvite = new MessageButton()
		.setLabel('Premium!')
		.setStyle('LINK')
		.setURL('https://patreon.com/weky');

	const btnBuy = new MessageButton()
		.setLabel('Invite me!')
		.setStyle('LINK')
		.setURL('https://discord.com/api/oauth2/authorize?client_id=809496186905165834&permissions=261188086870&scope=applications.commands%20bot');

	const btnJoin = new MessageButton()
		.setLabel('Support server!')
		.setStyle('LINK')
		.setURL('https://discord.gg/2EZSpxNB5z');

	message.channel.send({ embeds: [embed], components: [{ type: 1, components: [btnJoin, btnBuy, btnInvite] }] });
};

module.exports.help = {
	aliases: ['link', 'support'],
	name: 'invite',
	description: 'Links of da bot',
	usage: config.prefix + 'invite',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'utility',
	disable: false,
	cooldown: 1000,
};