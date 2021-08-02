/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');

module.exports.run = async (client, message, args, utils, data) => {
    const dataShips = await ssSchema.findOne({ SpaceShipCaptain: message.author.id })

    if (!dataShips) return message.reply('You don\'t! own any spaceships!')

    await ssSchema.findOneAndDelete({SpaceShipCaptain: message.author.id})
    message.reply('Success!')
};

module.exports.help = {
    aliases: [],
    name: 'destroy',
    description: 'Destroy your space ship!',
    usage: 'wek destroy',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'rpg',
    cooldown: 3000,
    disable: false,
};