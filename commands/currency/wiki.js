const Discord = require('discord.js');
/*  eslint-disable valid-typeof*/

module.exports.run = async (client, message, args, utils) => {

	if (!args[0]) return utils.errorEmbed(message, 'No power up specified!');
	const wiki = require('../../data/rpg-data').powerups.find((v) => v.aliases.includes(args.slice(0).join(' ').toLowerCase()));
	await require('../../schemas/rpg').findOne({ id: message.author.id }, async (err, db) => {
		if (!wiki) return utils.errorEmbed(message, 'The specified power up is invalid!');
		if(err) throw err;
		const custom = Discord.Util.parseEmoji(wiki.emoji);
		const embed = new Discord.MessageEmbed()
			.setAuthor(wiki.name, `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? 'gif' : 'png'}`)
			.addField('Power', `\`${wiki.powerName}\``, true)
			.addField('Cost', `\`${wiki.cost.toLocaleString()}\` ${utils.emojis.aero}`, true)
			.addField('Designations', `\`${wiki.aliases.join('` , `')}\``, true)
			.addField('Durability', `\`${wiki.durability}%\``, true)
			.addField('You own', `\`${db[wiki.name]}\``, true)
			.addField('Description', `${wiki.description}`, true);
		message.channel.send({ embeds: [embed] });
	});
};
module.exports.help = {
	aliases: ['w'],
	name: 'wiki',
	description: 'Displays the informations about power ups!',
	usage: 'wek wiki <powerup>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'currency',
	cooldown: 3000,
	disable: false,
};