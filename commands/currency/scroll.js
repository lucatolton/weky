
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {

    let userx = await data.rpg.user(message.author.id, message);
    let i = 0;
    let str = '';
    userx.db.powerups.forEach((p) => {
        const wiki = require('../../data/rpg-data').powerups.find((v) => v.powerName.includes(p))
        i++;
        str += '`' + (i) + '`. ' + wiki.emoji + '**' + wiki.name + '** with the power of `' + wiki.powerName + '`. [`\[' + userx.db[wiki.name + 'P'] + '%\]`](http://weky.cf)\n'
    })

    message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })).setDescription(str).setColor('RANDOM'))
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