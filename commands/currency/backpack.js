
const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgSchema = require('../../schemas/rpg')

module.exports.run = async (client, message, args, utils, data) => {
    await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {

        let i = 0
        const coll = client.backpack.get('bp');

        const disbut = require("discord-buttons")

        let select = new disbut.MessageMenu()
            .setID('inv')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Click here to see your backpack!');

        require('../../data/rpg-data').powerups.forEach((e) => {
            if (extractedData[e.name] > 0) {
                i++
                console.log(e.emojiID)
                select.addOption(new disbut.MessageMenuOption()
                    .setLabel(e.name)
                    .setValue(e.name)
                    .setDescription('You own: ' + extractedData[e.name])
                    .setEmoji(e.emojiID)
                    .setDefault())
            }
        })
        if (i == 0) return message.channel.send('Empty :(')

        let m = await message.channel.send('\u200b', { component: select })

        await coll.set(m.id, message.author.id);
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