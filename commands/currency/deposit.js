
const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgSchema = require('../../schemas/rpg')
const ssSchema = require('../../schemas/spaceship')
module.exports.run = async (client, message, args, utils, data) => {
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
        await ssSchema.findOne({ SpaceShipID: extractedData.stats.inWhatSpaceShip }, async (err, ssData) => {
            if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message)
            let percentageBetweenVault = utils.realPercentage(ssData.SpaceShipCurrent, ssData.SpaceShipMax)

            if (!args[0] || isNaN(parseInt(args[0])) || 100 > parseInt(args[0])) return utils.errorEmbed(message, 'No aero amount specified!')

            if (extractedData.aero < parseInt(args[0])) return utils.errorEmbed(message, 'Sorry! You specified more aero than you have!')
            if (ssData.SpaceShipCurrent + Math.round(parseInt(args[0])) > data.SpaceShipMax) return utils.errorEmbed(message, 'Your space ship vault reached the limit!')
            data.rpg.modify(message.author.id, 'aero', Math.round(parseInt(args[0]), message), '-=')

            ssData.SpaceShipCurrent += Math.round(parseInt(args[0]))
            ssData.save()
            message.reply(utils.emojis.share + ` | **${message.author.username}** deposited \`${Math.round(parseInt(args[0])).toLocaleString("en") + ' (' + Math.round(percentageBetweenVault) + '%)` ' + utils.emojis.aero} to **${ssData.SpaceShipName + '#' + ssData.SpaceShipID}**.`)
        })
    })
};
module.exports.help = {
    aliases: ['dep'],
    name: 'deposit',
    description: 'Deposit aero in your space ship vault!',
    usage: 'wek deposit <amount>',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'currency',
    cooldown: 10000,
    disable: false,
};