const Discord = require('discord.js');

const { MessageButton, MessageActionRow } = require('discord-buttons')

const msges = new Map();

const id1 = require('../util/utils').randomID(20)
const id2 = require('../util/utils').randomID(20)
const id3 = require('../util/utils').randomID(20)
const utils = require('../util/utils')
const rpgSchema = require('../schemas/rpg')

module.exports = async (client) => {

    const rpgDB = await client.data
    let buttons;


    client.on('clickMenu', async (button) => {
        if (button.clicker.user == null) return button.reply.send("Could not fetch your data!", true)
        const coll = client.backpack.get('bp');
        if (button.clicker.user.id !== coll.get(button.message.id)) return;
        button.reply.defer()
        async function b() {
            let msg = await button.message.channel.send('<@' + button.clicker.user.id + '>, Please select an action:', {
                components: [
                    new MessageActionRow()
                        .addComponent(
                            new MessageButton()
                                .setID(id1)
                                .setLabel('Use')
                                .setEmoji('🖱️')
                                .setStyle('blurple')
                        )
                        .addComponent(
                            new MessageButton()
                                .setID(id2)
                                .setLabel('Info')
                                .setEmoji('🤔')
                                .setStyle('grey')
                        )
                        .addComponent(
                            new MessageButton()
                                .setID(id3)
                                .setLabel('Eject')
                                .setEmoji('🗑️')
                                .setStyle('red')
                        )
                ]

            })
            msges.set(button.clicker.user.id, msg)
        }
        buttons = button

        if (msges.has(button.clicker.user.id)) return msges.forEach((c) => {
            if (c.content.startsWith('<@' + buttons.clicker.user.id + '>')) {
                c.edit('\u200b', {
                    components: [
                        new MessageActionRow()
                            .addComponent(
                                new MessageButton()
                                    .setID(id1)
                                    .setLabel('Use')
                                    .setEmoji('🖱️')
                                    .setStyle('blurple')
                                    .setDisabled()
                            )
                            .addComponent(
                                new MessageButton()
                                    .setID(id2)
                                    .setLabel('Info')
                                    .setEmoji('🤔')
                                    .setStyle('grey')
                                    .setDisabled()
                            )
                            .addComponent(
                                new MessageButton()
                                    .setID(id3)
                                    .setLabel('Eject')
                                    .setEmoji('🗑️')
                                    .setStyle('red')
                                    .setDisabled()
                            )
                    ]
                });
                b()
            }
        })
        b()
    })
    client.on('clickButton', async (btn) => {
        const coll = client.backpack.get('bp');

        if (btn.id == id1) {
            if (btn.clicker.user.id !== coll.get(buttons.message.id)) return;
            await rpgSchema.findOne({ id: btn.clicker.user.id }).lean().exec().then(async (userData) => {

                const wiki = require('./rpg-data').powerups.find((v) => v.name.includes(buttons.values[buttons.values.length - 1]))

                if (userData[wiki.name] <= 0) return btn.reply.send('The specified power up is not in your backpack!');

                if (userData.powerups.includes(wiki.powerName)) return btn.reply.send('The specified power up is already used!');

                const b = await utils.use(btn.clicker.user.id, buttons.values[buttons.values.length - 1], rpgDB, btn.message)

                btn.reply.send(`**${btn.clicker.user.username}** used one ${b.custom}. The durability of it is \`${b.wiki.durability}%\`.`, true)
            })
        }
        if (btn.id == id2) {
            if (btn.clicker.user.id !== coll.get(buttons.message.id)) return;
            await rpgSchema.findOne({ id: btn.clicker.user.id }).lean().exec().then(async (userData) => {

                const wiki = require('./rpg-data').powerups.find((v) => v.name.includes(buttons.values[buttons.values.length - 1]))

                let custom = Discord.Util.parseEmoji(wiki.emoji);

                const embed = new Discord.MessageEmbed()
                    .setAuthor(wiki.name, `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`)
                    .addField('Power', `\`${wiki.powerName}\``, true)
                    .addField('Cost', `\`${wiki.cost.toLocaleString()}\` ${utils.emojis.aero}`, true)
                    .addField('Designations', `\`${wiki.aliases.join('` , `')}\``, true)
                    .addField('Durability', `\`${wiki.durability}%\``, true)
                    .addField('You own', `\`${userData[wiki.name]}\``, true)
                    .addField('Description', `${wiki.description}`, true)

                btn.reply.send({ embed: embed, ephemeral: true })
            })
        }
        if (btn.id === id3) {
            if (btn.clicker.user.id !== coll.get(buttons.message.id)) return;

            btn.reply.defer()
            await btn.message.channel.send('Total: 0', {
                components: [
                    {
                        type: 1,
                        components: [new MessageButton().setID('1').setLabel('1').setStyle('gray'), new MessageButton().setID('2').setLabel('2').setStyle('gray'), new MessageButton().setID('3').setLabel('3').setStyle('gray')],
                    },
                    {
                        type: 1,
                        components: [new MessageButton().setID('4').setLabel('4').setStyle('gray'), new MessageButton().setID('5').setLabel('5').setStyle('gray'), new MessageButton().setID('6').setLabel('6').setStyle('gray')],
                    },
                    {
                        type: 1,
                        components: [new MessageButton().setID('7').setLabel('7').setStyle('gray'), new MessageButton().setID('8').setLabel('8').setStyle('gray'), new MessageButton().setID('9').setLabel('9').setStyle('gray')],
                    },
                    {
                        type: 1,
                        components: [new MessageButton().setID('done').setLabel('Done').setStyle('green'), new MessageButton().setID('0').setLabel('0').setStyle('gray'), new MessageButton().setID('stop').setLabel('Stop').setStyle('red')],
                    },
                ],
            }).then(async (msg) => {

                const calc = await msg.createButtonCollector((c) => c.clicker.user.id === btn.clicker.user.id);
                let str = ''
                async function edit(cl) {
                    await cl.message.edit('Total: ' + str, {
                        components: [
                            {
                                type: 1,
                                components: [new MessageButton().setID('1').setLabel('1').setStyle('gray'), new MessageButton().setID('2').setLabel('2').setStyle('gray'), new MessageButton().setID('3').setLabel('3').setStyle('gray')],
                            },
                            {
                                type: 1,
                                components: [new MessageButton().setID('4').setLabel('4').setStyle('gray'), new MessageButton().setID('5').setLabel('5').setStyle('gray'), new MessageButton().setID('6').setLabel('6').setStyle('gray')],
                            },
                            {
                                type: 1,
                                components: [new MessageButton().setID('7').setLabel('7').setStyle('gray'), new MessageButton().setID('8').setLabel('8').setStyle('gray'), new MessageButton().setID('9').setLabel('9').setStyle('gray')],
                            },
                            {
                                type: 1,
                                components: [new MessageButton().setID('done').setLabel('Done').setStyle('green'), new MessageButton().setID('0').setLabel('0').setStyle('gray'), new MessageButton().setID('stop').setLabel('Stop').setStyle('red')],
                            },
                        ],
                    });
                }
                calc.on('collect', async (cl) => {


                    if (['0', '1', '2', '3', '4', '5', '6', '7', '9'].includes(cl.id)) {
                        cl.reply.defer()
                        str += cl.id
                        edit(cl)
                    }
                    if (cl.id === 'done') {
                        await rpgSchema.findOne({ id: btn.clicker.user.id }).lean().exec().then(async (userData) => {

                            if (userData[buttons.values[buttons.values.length - 1]] < str) return cl.reply.send('The specified amount of power ups are not in your backpack!');

                            rpgDB.modify(cl.clicker.user.id, buttons.values[buttons.values.length - 1], str, '-=', btn.message)
                            msg.delete()
                            cl.reply.send('Ejected `' + str + ' ' + buttons.values[buttons.values.length - 1] + '` in space.', true)
                        })
                    }
                    if (cl.id === 'stop') {
                        calc.stop()
                        msg.delete()
                    }
                })
            })
        }
    })
};