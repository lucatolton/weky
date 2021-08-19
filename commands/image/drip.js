const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	const Canvas = require('canvas');

	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	const canvas = Canvas.createCanvas(867, 892);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://i.redd.it/ybb2xn4hs6a61.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


	ctx.drawImage(avatar, 350, 150, 205, 205);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `Drip${member.user.username}.jpg`);
	message.channel.send({ files: [attachment] });
};

module.exports.help = {
	aliases: [],
	name: 'drip',
	description: 'Transforming your pfp in a drip meme.',
	usage: config.prefix + 'drip {none OR @user}',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'image',
	disable: false,
	cooldown: 1000,
};