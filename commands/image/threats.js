const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
	const avatar = member.user.displayAvatarURL({ format: 'jpg' });

	message.channel.send('Loading...');
	const res = `https://nekobot.xyz/api/imagegen?type=threats&url=${avatar}&raw=1`;
	const embed = new Discord.MessageEmbed()
		.setImage(res)
		.setColor('#303030');
	message.channel.send({ embeds: [embed] });

};

module.exports.help = {
	aliases: [],
	name: 'threats',
	description: 'You are a threat.',
	usage: config.prefix + 'threats {none OR @user}',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'image',
	disable: false,
	cooldown: 1000,
};