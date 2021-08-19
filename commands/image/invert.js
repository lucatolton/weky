const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	const canvacord = require('canvacord');
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
	const avatar = member.user.displayAvatarURL({ format: 'jpg' });
	const image = await canvacord.Canvas.invert(avatar);
	const attachment = new Discord.MessageAttachment(image, 'invert.png');
	message.channel.send({ files: [attachment] });
};

module.exports.help = {
	aliases: [],
	name: 'invert',
	description: 'Transforming your pfp with a invert effect.',
	usage: config.prefix + 'invert {none OR @user}',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'image',
	disable: false,
	cooldown: 1000,
};