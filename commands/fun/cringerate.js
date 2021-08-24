const config = require('../../util/config.json');

module.exports.run = async (client, message) => {
	const { MessageEmbed } = require('discord.js');
	const rate = (Math.floor(Math.random() * Math.floor(100)));

	const user = message.mentions.users.first() || message.author;

	const embed = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle('CRINGE MACHINE')
		.setDescription(`${user.username} is ${rate}% cringe <:lol:695581441471545374>`)
		.setTimestamp();

	message.channel.send({ embeds: embed });
};

module.exports.help = {
	aliases: ['cr'],
	name: 'cringerate',
	description: 'Rating your cringy.',
	usage: config.prefix + 'cringerate',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 1000,
};