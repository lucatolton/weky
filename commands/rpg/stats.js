
            
            const Discord = require('discord.js');
            const config = require('../../util/config.json');

            module.exports.run = async (client, message, args, utils, data) => {
let userx = await data.rpg.user(message.author.id, message)
let embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.addField('_ _' , '**☠️ Deaths Counter**: \n' + userx.db.stats.diedCounter, true)
.addField('_ _' , '**🗡️ Mobs Killed**:\n' + userx.db.stats.mobsKilled, true)
.setFooter('©️ Weky RPG')
message.reply(embed)
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