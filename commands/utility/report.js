const config = require('../../util/config.json');
const { MessageButton, MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
	const channel = client.channels.cache.get('835185415224950794');

	const btn = new MessageButton()
		.setLabel('Support server!')
		.setStyle('url')
		.setURL('https://discord.gg/2EZSpxNB5z');

	const query = args.slice(0).join(' ');
	if (!query) return message.reply('Please specify the bug');

	const embed = new MessageEmbed()
		.setTitle('New Bug!')
		.addField('Author', message.author.tag, true)
		.addField('Guild', message.guild.name, true)
		.addField('Report', query)
		.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
		.setTimestamp();
	channel.send(embed);
	message.channel.send({
		content: '**Bug report has been sent!**\nJoin here if you want to see it',
		components: [{
			type: 2,
			components: [btn],
		}] },
	);
};

module.exports.help = {
	aliases: ['report', 'reportbug'],
	name: 'bug',
	description: 'Report a bug',
	usage: config.prefix + 'report %bug%',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'utility',
	disable: false,
	cooldown: 1000,
};