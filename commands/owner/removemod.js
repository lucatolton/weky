const Discord = require('discord.js');
const config = require('../../util/config.json');
module.exports.run = async (client, message, args) => {
	const target = message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.id === args[0] || m.user.tag.startsWith(args[0]) || m.displayName.startsWith(args[0]));

	if (!message.author.id.includes('778518819055861761')) {
		return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('LEAVE ME FUCKING ALONE').setColor('RED')] });
	}
	if (!target) return message.channel.send('No user.');

	await client.data.moderator(target.id, 'false');
	message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle('Success!').setDescription(`Successfully revoked **<@${target.id}>'s** Weky Moderator`).setColor('RED')] });

	return target.send({ embeds: [new Discord.MessageEmbed().setTitle('Alert').setDescription(`**${message.author.tag}** revoked your Weky Moderator`).setColor('RED')] });

};

module.exports.help = {
	aliases: ['r-m'],
	name: 'remove-mod',
	description: 'Remove a Weky Moderator',
	usage: config.prefix + 'remove-mod @user',
};

module.exports.config = {
	category: 'owner',
	restricted: true,
	disable: false,
	cooldown: 2000,
};