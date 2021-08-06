/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require("../../schemas/rpg")
module.exports.run = async (client, message, args, utils, data) => {
    if (!args[0]) return message.reply('Please specify the spaceship id!')
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
        if (extractedData.stats.isInSpaceShip == true) return message.reply('You are already in a spaceship!')
        const query = { SpaceShipID: args[0].replace('#', '') }
        const d = await ssSchema.findOne(query)

        if (!d) return message.reply('I can\'t find this spaceship!')

        if (d.SpaceShipPrivate === true) {
            d.SpaceShipMessages.push(`${message.author.id}**${message.author.tag} (${message.author.id})** requested to join! Use \`wek approve/deny [Tag/Username/Id]\`!`)

            await ssSchema.findOneAndUpdate(query, d, { upset: true })

            message.channel.send('Successfully **applied** to enter in `' + d.SpaceShipName + '`! Please wait until a co-pilot or the captain accept/decline!')
        } else {

            message.channel.send('Successfully entered in `' + d.SpaceShipName + '`! Have fun!')
            await data.rpg.modifyStats(message.author.id, 'isInSpaceShip', true, '=', message)
            await data.rpg.modifyStats(message.author.id, 'inWhatSpaceShip', args[0].replace('#', ''), '=', message)

            d.SpaceShipPilots[message.author.id] = Date.now()
            await ssSchema.findOneAndUpdate(query, d, { upset: true })
        }
    })
};

module.exports.help = {
    aliases: [],
    name: 'enter',
    description: 'Request/enter a spaceship!',
    usage: 'wek enter <id>',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'rpg',
    cooldown: 3000,
    disable: false,
};