/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const id = require('../../util/utils').randomID(6)

module.exports.run = async (client, message, args, utils, data) => {
    // await ssSchema.findOneAndDelete({ SpaceShipCaptain: message.author.id })

    const dataShips = await ssSchema.findOne({ SpaceShipCaptain: message.author.id })

    if (dataShips) return message.reply('You are already a Captain in `' + dataShips.SpaceShipName + '`!')
    await ssSchema.create({ SpaceShipID: id, SpaceShipCaptain: message.author.id }).then(async (d) => {
        
        await data.rpg.modifyStats(message.author.id, 'isInSpaceShip', true, '=', message)
        await data.rpg.modifyStats(message.author.id, 'inWhatSpaceShip', id, '=', message)
        d.SpaceShipPilots[message.author.id] = Date.now()
        await ssSchema.findOneAndUpdate({ SpaceShipCaptain: message.author.id }, d, { upset: true })

        message.reply('Success! Check it within\' `wek spaceship`!')
    })
};

module.exports.help = {
    aliases: [],
    name: 'create',
    description: 'Create your own space ship!',
    usage: 'wek create',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'rpg',
    cooldown: 3000,
    disable: false,
};