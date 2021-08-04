/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require("../../schemas/rpg")

module.exports.run = async (client, message, args, utils, data) => {
    const dataShips = await ssSchema.findOne({ SpaceShipCaptain: message.author.id })

    if (!dataShips) return message.reply('You don\'t! own any spaceships!')
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {

        extractedData.stats.isInSpaceShip = false
        extractedData.stats.inWhatSpaceShip = null

        await ssSchema.findOneAndDelete({ SpaceShipCaptain: message.author.id })

        await rpgSchema.findOneAndUpdate({ id: message.author.id }, extractedData, { upset: true })

    })
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