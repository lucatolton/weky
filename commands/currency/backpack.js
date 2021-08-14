
const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgSchema = require('../../schemas/rpg')
const rpgData = require('../../data/rpg-data')

module.exports.run = async (client, message, args, utils, data) => {
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
        if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message)

        let i = 0

        rpgData.powerups.forEach((e) => {
            if (extractedData[e.name] > 0) {
                i++
                str += e.emoji + ' **' + e.name + '** - ' + extractedData[e.name]
            }
        })
        if (i == 0) return message.channel.send('Empty :(')

        let m = await message.channel.send(str)
    })
};
module.exports.help = {
    aliases: ['bp'],
    name: 'backpack',
    description: 'Displays what you have!',
    usage: 'wek backpack',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'currency',
    cooldown: 3000,
    disable: false,
};