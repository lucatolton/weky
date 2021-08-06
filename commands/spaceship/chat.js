/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require("../../schemas/rpg")
module.exports.run = async (client, message, args, utils, data) => {
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {

        const query = { SpaceShipID: extractedData.stats.inWhatSpaceShip }
        const d = await ssSchema.findOne(query)

        if (!d) return message.reply('I can\'t find this spaceship!')


        if (args[0]) {
            message.react('👀')
            d.SpaceShipMessages.push(`${message.author.id}${args.slice(1).join(' ')}`)

            await ssSchema.findOneAndUpdate(query, d, { upset: true })

        } else {
            const messages = []
            d.SpaceShipMessages.forEach((msg) => { 
                console.log(msg.slice(0, 17))
                messages.push(`**${client.users.cache.get(msg.slice(0, 17)).tag}**: ${msg.slice(17)}`) 
            })

            if (extractedData.stats.isInSpaceShip == false) return message.reply('You are not in any spaceship!')
            message.channel.send(
                new Discord.MessageEmbed()
                    .setDescription(messages.join('\n') || 'Empty :/')
                    .setTitle(d.SpaceShipName)
                    .setThumbnail(d.SpaceShipIcon)
                    .setColor("RANDOM")
            )
        }
    })
};

module.exports.help = {
    aliases: [],
    name: 'chat',
    description: 'See your space ship chat!',
    usage: 'wek chat [message]',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'rpg',
    cooldown: 3000,
    disable: false,
};