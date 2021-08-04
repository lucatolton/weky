
const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgSchema = require('../../schemas/rpg')

module.exports.run = async (client, message, args, utils, data) => {
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
        const equipedHero = extractedData.hero.find((e) => e.heroEquiped === true)
        let i = 0;
        let str = '';
        extractedData.powerups.forEach((p) => {
            const wiki = require('../../data/rpg-data').powerups.find((v) => v.powerName.includes(p))
            i++;
            str += '`' + (i) + '`. ' + wiki.emoji + '**' + wiki.name + '** with the power of `' + wiki.powerName + '`. [`\[' + extractedData[wiki.name + 'P'] + '%\]`](http://weky.cf)\n'
        })

        message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })).setDescription(str).setColor('RANDOM'))
    })
};
module.exports.help = {
    aliases: [],
    name: 'scroll',
    description: 'See your current power ups!',
    usage: 'wek scroll',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'currency',
    cooldown: 7000,
    disable: false,
};