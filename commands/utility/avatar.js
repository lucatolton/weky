const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message) => {
	const user = message.mentions.users.first() || message.author;
	const embed = new Discord.MessageEmbed()
		.setTitle(`${user.tag}'s avatar!`)
		.setColor('#e4101f')
		.setImage(user.displayAvatarURL({ size: 4096, dynamic: true }));
	message.channel.send({ embeds: [embed] });
};

module.exports.help = {
	aliases: ['av'],
	name: 'avatar',
	description: 'Displaying someone\'s avatar',
	usage: config.prefix + 'avatar {none OR @user}',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'utility',
	disable: false,
	cooldown: 1000,
};