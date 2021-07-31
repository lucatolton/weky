
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, utils, data) => {
	if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE CHANNELS` permission.');
	const channel = message.mentions.channels.first();
	if (['true', 'false'].includes(args[0])) {

		await client.data.setchatbot_enabled(message.guild.id, args[0]);
		await client.data.setchatbot_channel(message.guild.id, channel.id ? channel.id : null);
		const me = new MessageEmbed()
			.setColor('GREEN')
			.setDescription(`Success, chatbot set to \`${args[0]}\` in <#${channel.id}>`);
		message.channel.send(me);
	}
	else {
		message.channel.send('Use this `wek setchat <channel> true/false`');
	}

};

module.exports.help = {
	aliases: [],
	name: 'setchat',
	description: 'Enable chatbot in a channel',
	usage: 'wek setchat <channel> true/false',
};

module.exports.config = {
	args: true,
	restricted: false,
	category: 'utility',
	disable: false,
	cooldown: 10000,
};