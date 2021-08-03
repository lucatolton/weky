/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');

module.exports.run = async (client, message, args, utils, data) => {
    const dataShips = await ssSchema.findOne({ SpaceShipCaptain: message.author.id })

    if (!dataShips) return message.reply('You don\'t! own any spaceships!')

    switch (args[0]) {
        case 'icon':
            const icon = args[1]


            if (!icon) return message.reply('You must provide an url!')
            if (icon.startsWith('https://cdn.discordapp.com') == false) return message.reply('**Due to security reason Weky will only accept images that __has been upploaded in discord__**!\nExample: `https://cdn.discordapp.com/...`\nHow? : Drop/send your __downloaded__ image in discord and click on it > Open Original or drop it in browser tab!')
            if (icon.endsWith('.png') == false || icon.endsWith('.jpg') == false || icon.endsWith('.jpeg') == false)

                dataShips.SpaceShipIcon = icon
            dataShips.save()
            message.reply('Successfully applied the changes!')

            break;
        case 'name':

            const name = args[1]
            if (!name) return message.reply('You must provide an name!')
            dataShips.SpaceShipName = name
            dataShips.save()
            message.reply('Successfully applied the changes!')

            break;
        case 'description':

            const description = args.slice(1).join(' ')
            if (!description) return message.reply('You must provide an description!')
            dataShips.SpaceShipDescription = description
            dataShips.save()
            message.reply('Successfully applied the changes!')

            break;
        case 'officer':

            const officer = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || client.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(" ") || x.user.username === args[1]);
            if (!officer) return message.reply('You must provide an officer!')
            if (dataShips.SpaceShipCoPilot == officer.id) dataShips.SpaceShipCoPilot = null
            dataShips.SpaceShipOfficer = officer.id
            dataShips.save()
            message.reply('Successfully applied the changes!')

            break;
        case 'copilot':

            const copilot = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || client.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(" ") || x.user.username === args[1]);
            if (!copilot) return message.reply('You must provide an copilot!')
            if (dataShips.SpaceShipOfficer == copilot.id) dataShips.SpaceShipOfficer = null
            dataShips.SpaceShipCoPilot = copilot.id
            dataShips.save()
            message.reply('Successfully applied the changes!')

            break;

        default:

            message.reply(new Discord.MessageEmbed().setTitle('Space ship control panel').setDescription('`description`, `name`, `icon`, `officer`, `copilot`'))

            break;
    }
};

module.exports.help = {
    aliases: [],
    name: 'set',
    description: 'Set your space ship details!',
    usage: 'wek set',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'rpg',
    cooldown: 3000,
    disable: false,
};