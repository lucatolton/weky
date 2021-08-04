/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require('../../schemas/rpg')

module.exports.run = async (client, message, args, utils, data) => {
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then((extractedData) => {

        if (extractedData.stats.isInSpaceShip == false) return message.reply('You don\'t! are not in any spaceships!')
        const d = await ssSchema.findOne({ SpaceShipID: extractedData.stats.inWhatSpaceShip })

        if (!d) return message.reply('You don\'t! are not in any spaceships!')

        const canvas = await utils.displaySs(d, client)

        const iconsAttachment = new Discord.MessageAttachment(canvas.toBuffer(), 'icons.png')
        message.reply(iconsAttachment)
    })
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