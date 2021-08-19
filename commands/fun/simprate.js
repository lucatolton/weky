const config = require('../../util/config.json');

module.exports.run = async (client, message) => {
	const { MessageEmbed } = require('discord.js');

	const rate = (Math.floor(Math.random() * Math.floor(100)));

	const user = message.mentions.users.first() || message.author;

	const embed = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle('SIMP MACHINE')
		.setDescription(`${user.username} is ${rate}% simp 😳`)
		.setTimestamp();

	message.channel.send(embed);
};

module.exports.help = {
	aliases: ['sr'],
	name: 'simprate',
	description: 'Rating your simpy.',
	usage: config.prefix + 'simprate',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 1000,
};

