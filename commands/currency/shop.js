
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {

    const embed1 = new Discord.MessageEmbed().setFooter('wek wiki <item> for more info!');
    require('../../data/rpg-data').powerups.forEach((e) => { if (e.cost !== false) embed1.addField(e.emoji + ' ' + e.name, '`' + e.cost.toLocaleString() + '` ' + utils.emojis.aero, true) })
    utils.createButtonPagination([embed1], message)
};
module.exports.help = {
    aliases: ['store'],
    name: 'shop',
    description: 'Displays the stop!',
    usage: 'wek shop',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'currency',
    cooldown: 3000,
    disable: false,
};