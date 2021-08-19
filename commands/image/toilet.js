const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	const Canvas = require('canvas');

	const canvas = Canvas.createCanvas(500, 670);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/779441456464003122/812706484240121876/unknown.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

	ctx.drawImage(avatar, 135, 350, 205, 205);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `toilet_${member.user.username}.jpg`);
	message.channel.send({ files: [attachment] });
};

module.exports.help = {
	aliases: [],
	name: 'toilet',
	description: 'You IN Toilet.',
	usage: config.prefix + 'toilet {none OR @user}',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'image',
	disable: false,
	cooldown: 1000,
};