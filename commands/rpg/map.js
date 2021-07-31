
  

const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils, data) => {
    let userx = await data.rpg.user(message.author.id, message)
	const db =  userx.db.stats.planet
	const embed1 = new Discord.MessageEmbed()
	.setAuthor(message.author.tag, message.author.displayAvatarURL())
	.setImage('https://cdn.discordapp.com/attachments/812590454821355543/854672032994426891/Untitled360_20210616173850.png')
	.setFooter('The point is in your location | wek select | ©️ Weky RPG')
	const embed2 = new Discord.MessageEmbed()
	.setAuthor(message.author.tag, message.author.displayAvatarURL())
	.setImage('https://cdn.discordapp.com/attachments/812590454821355543/854672033363394560/Untitled360_20210616173902.png')
	.setFooter('The point is in your location | wek select | ©️ Weky RPG')
    if(db === 'Moon') return message.reply(embed1)
    if(db === 'Terra') return message.reply(embed2)

};

module.exports.help = {
	aliases: ['planet', 'planets', 'where', 'whereami'],
	name: 'map',
	description: 'Displays the Weky Rpg map!',
	usage: 'wek map',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'rpg',
	cooldown: 10000,
	disable: false,
};
