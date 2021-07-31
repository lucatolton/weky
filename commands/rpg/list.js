            
            const Discord = require('discord.js');
            const config = require('../../util/config.json');

            module.exports.run = async (client, message, args, utils, data) => {
let userx = await data.rpg.user(message.author.id, message)
let check, returnBold;
const mobFinder = require('../../data/map').find((val) => val.planet === userx.stats.planet)
const Mob = mobFinder.mobs

const mappedData = Object.keys(Mob).map((key) => {
    if(userx.db.stats.mobsDefeated.includes(Mob[key].name)) {
    check = '<:yes:853631479384899614>'
    } else {
    check = '<:no:853631424507019304>'
    }
    if(Mob[key].isBoss === true) {
    returnBold = `${Mob[key].emoji} **${Mob[key].name}**`
    } else {
    returnBold = `${Mob[key].emoji} ${Mob[key].name}`
    }
    return `${returnBold} - ${check}`
})
.join("\n");
let embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(mappedData)
.setFooter('©️ Weky RPG')
message.reply(embed)
};
            
module.exports.help = {
	aliases: [],
	name: 'list',
	description: 'Displays the mobs you defeated/still have to defeat!',
	usage: 'wek list',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'rpg',
	cooldown: 3000,
	disable: false,
};