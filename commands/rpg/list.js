
const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgSchema = require('../../schemas/rpg')

module.exports.run = async (client, message, args, utils, data) => {
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {

        let check, returnBold;
        const mobFinder = require('../../data/map').find((val) => val.planet === extractedData.stats.planet)
        const Mob = mobFinder.mobs

        const mappedData = Object.keys(Mob).map((key) => {
            if (extractedData.stats.mobsDefeated.includes(Mob[key].name)) {
                check = '<:yes:853631479384899614>'
            } else {
                check = '<:no:853631424507019304>'
            }
            if (Mob[key].isBoss === true) {
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
    })
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