

const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgSchema = require('../../schemas/rpg')

module.exports.run = async (client, message, args, utils, data) => {
	let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
	await rpgSchema.findOne({ id: user.user.id }).lean().exec().then(async (extractedData) => {

        if (!extractedData || typeof extractedData == null) return message.channel.send('Seems like the user never tried our rpg.. sad.')

	message.reply(utils.emojis.aero + ` | **${user.user.username}** has \`${extractedData.aero.toLocaleString()}\`.`)
	})
};
module.exports.help = {
	aliases: ['money', 'pocket', 'ca', 'm', 'cash'],
	name: 'aero',
	description: 'Displays your aero!',
	usage: 'wek aero',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'currency',
	cooldown: 4000,
	disable: false,
};