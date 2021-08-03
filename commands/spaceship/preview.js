/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');

module.exports.run = async (client, message, args, utils, data) => {
    if(!args[0])  return message.reply('Please specify the spaceship id!')
    let userx = await data.rpg.user(message.author.id, message)

    if (userx.db.stats.isInSpaceShip == false) return message.reply('You don\'t! are not in any spaceships!')
    const d = await ssSchema.findOne({ SpaceShipID: args[0] })

    if (!d) return message.reply('I can\'t find this spaceship!')

    const canvas = await utils.displaySs(d, client)

    const iconsAttachment = new Discord.MessageAttachment(canvas.toBuffer(), 'icons.png')
    message.reply(iconsAttachment)

};

module.exports.help = {
    aliases: [],
    name: 'preview',
    description: 'Preview a specified space ship!',
    usage: 'wek preview <id/name>',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'rpg',
    cooldown: 3000,
    disable: false,
};