const Discord = require('discord.js');
const users = require('../../schemas/userDB');
module.exports.run = async (client, message, args) => {

	const target = client.users.cache.get(args[0]);
	if (!target) return message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle('Error').setDescription('Please provide a user!').setColor('RED') ] });
	users.findOne({ id: target }, async (err, data) => {
		data.premium = true;
		data.save();
		message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle('Success!').setDescription(`Premium set for **${client.users.cache.get(target).tag}** `).setColor('GREEN')] });
		client.channels.cache.get('835918793166422016').send({ embeds: [new Discord.MessageEmbed().setTitle(`Premium added to ${client.users.cache.get(target).username}`).setColor('GREEN') ] });
	});
};
module.exports.help = {
	aliases: ['setuserp', 'userp'],
	name: 'setuserpremium',
	description: 'Set a user premium',
	usage: '.setuserpremium %ID% %toggle% %level%',
};

module.exports.config = {
	args: false,
	restricted: true,
	category: 'owner',
	disable: false,
	cooldown: 0,
};