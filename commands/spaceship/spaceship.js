/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');

module.exports.run = async (client, message, args, utils, data) => {

    let userx = await data.rpg.user(message.author.id, message)

    if (userx.db.stats.isInSpaceShip == false) return message.reply('You don\'t! are not in any spaceships!')
    const d = await ssSchema.findOne({ SpaceShipID: userx.db.stats.inWhatSpaceShip })

    if (!d) return message.reply('You don\'t! are not in any spaceships!')

    const canvas = await utils.displaySs(d, client)

    const iconsAttachment = new Discord.MessageAttachment(canvas.toBuffer(), 'icons.png')
    message.reply(iconsAttachment)

};

module.exports.help = {
    aliases: ['ss'],
    name: 'spaceship',
    description: 'See your space ship!',
    usage: 'wek spaceship',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'rpg',
    cooldown: 3000,
    disable: false,
};