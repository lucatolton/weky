

const Discord = require('discord.js');
const config = require('../../util/config.json');
module.exports.run = async (client, message, args) => {
	const target = message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.id === args[0] || m.user.tag.startsWith(args[0]) || m.displayName.startsWith(args[0]));

	if (!message.author.id.includes('778518819055861761')) {
		return message.channel.send(new Discord.MessageEmbed().setDescription('LEAVE ME FUCKING ALONE',).setColor('RED'));
	}
	if (!target) return message.channel.send('No user.');

	await client.data.moderator(target.id, 'true');
	message.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(`Successfully added **<@${target.id}>** as Weky Moderator`,).setColor('GREEN'),);

	return target.send(new Discord.MessageEmbed().setTitle('Alert').setDescription(`**${message.author.tag}** added you as Weky Moderator`).setColor('GREEN'));

};

module.exports.help = {
	aliases: ['a-m'],
	name: 'add-mod',
	description: 'Add a Weky Moderator',
	usage: config.prefix + 'add-mod @user',
};

module.exports.config = {
	restricted: false,
	category: 'owner',
	disable: false,
	cooldown: 0,
};