

const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgSchema = require('../../schemas/rpg')

module.exports.run = async (client, message, args, utils, data) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {

	let embed = new Discord.MessageEmbed()
		.setAuthor(message.author.tag, message.author.displayAvatarURL())
		.addField('_ _', '**☠️ Deaths Counter**: \n' + extractedData.stats.diedCounter, true)
		.addField('_ _', '**🗡️ Mobs Killed**:\n' + extractedData.stats.mobsKilled, true)
		.setFooter('©️ Weky RPG')
	message.reply(embed)
	})
};
module.exports.help = {
	aliases: [],
	name: 'stats',
	description: 'Displays your stats!',
	usage: 'wek stats',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'rpg',
	cooldown: 3000,
	disable: false,
};