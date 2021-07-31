

const config = require('../util/config.json');
const Discord = require('discord.js');
const { populate } = require('../schemas/Guild');

module.exports.run = async (client, message, args, utils, data) => {

    const { MessageActionRow, MessageButton } = require('discord-buttons')

    const schema = require("../schemas/Guild")


    await schema.findOne({ id: message.guild.id }, async (err, dat) => {

        if (message.channel.id !== dat.amogus.inWhatChannel) return message.channel.send('A game is already running but you\'re not in it!')

        let myMap = new Map();
        let btns = new MessageActionRow()
        let btns2 = new MessageActionRow()
        let btns3 = new MessageActionRow().addComponent(new MessageButton().setStyle('grey').setLabel('Skip').setID(`skip-${message.channel.id}`))
        let users = dat.amogus.whoIsInGame
        let colors = ['red', 'green', 'grey', 'blurple']
        let i = -1
        let skiped = 0
        let pp = []
        let clickers = []
        let um = []
        let w = ''

        Object.values(users).forEach(async (umm) => {
i++
            
            let randoms = colors[Math.floor(Math.random() * colors.length)]
            let x = Object.keys(users)[i]
            let xd = await message.guild.members.cache.get(x)
            // console.log(xd.user)
            console.log(x)
            console.log(i)
            console.log(Object.keys(users))
            console.log(xd)
            myMap.set(Object.keys(users)[i], 0)
            um.push(xd.id)

            
            if (i <= Object.keys(users).length / 2) {
                console.log('Btns1 triggered due to ' + i + ' <' + Object.keys(users).length)

                btns.addComponent(new MessageButton()
                    .setStyle(randoms)
                    .setEmoji(Discord.Util.parseEmoji(umm).id)
                    .setLabel(xd.user.username)
                    .setID(i)
                )
                    console.log(btns.components)


            } else
                if (i <= Object.keys(users).length) {
                    console.log('Btns2 triggered due to ' + i + ' <' + Object.keys(users).length)
                    btns2.addComponent(
                        new MessageButton()
                            .setStyle(randoms)
                            .setEmoji(Discord.Util.parseEmoji(umm).id)
                            .setLabel(xd.user.username)
                            .setID(i)
                    )
                    console.log(btns2.components)

                }
        })
        console.log(btns)
        console.log(btns2)
        console.log(btns3)
        message.channel.send('Vote! Ends in 50s!', {
            components: [btns.addComponent(
                new MessageButton()
                    .setStyle('red')
                    .setLabel('test')
                    .setID('null')
            ), btns2.addComponent(
                new MessageButton()
                    .setStyle('red')
                    .setLabel('test')
                    .setID('null')),
            btns3.addComponent(
                new MessageButton()
                    .setStyle('red')
                    .setLabel('test')
                    .setID('null')
            )
            ]
        }).then(async (msg) => {


            let coll = await msg.createButtonCollector((x) => x)

            coll.on('collect', async b => {

                if (clickers.includes(b.clicker.user.id)) b.reply.send('You already voted!', true)
                let xd = um[b.id - 1]

                let h = client.users.cache.get(xd)

                if (b.id == `skip-${b.channel.id}`) {
                    b.reply.send('You voted for `skip`!', true)
                    skiped += 1
                } else {
                    b.reply.send('You voted for **' + h.username + '**!', true)

                    clickers.push(b.clicker.user.id)

                    myMap.set(h.id, myMap.get(h.id) + 1);
                }
            })
            setTimeout(async () => {
                msg.delete()
                myMap[Symbol.iterator] = function* () {
                    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
                }

                myMap.forEach(async (u, n) => {

                    if ([...myMap].sort(c)[[...myMap].length - 1][0] == n && [...myMap].sort(c)[[...myMap].length - 1][1] == [...myMap].sort(c)[[...myMap].length - 2][1]) {
                        let sex = ([...myMap].sort(c)[[...myMap].length - 1][0])
                        return w += users[[...myMap].sort(c)[[...myMap].length - 1][0]] + ' **' + await message.guild.members.fetch({ sex, force: true }).user.username + '**: `' + [...myMap].sort(c)[[...myMap].length - 1][1] + '`\n'
                    }
                    if ([...myMap].sort(c)[[...myMap].length - 2][0] == n && [...myMap].sort(c)[[...myMap].length - 1][1] == [...myMap].sort(c)[[...myMap].length - 2][1]) {
                        let sex = ([...myMap].sort(c)[[...myMap].length - 2][0])
                        return w += users[[...myMap].sort(c)[[...myMap].length - 2][0]] + ' **' + await message.guild.members.fetch({ sex, force: true }).user.username + '**: `' + [...myMap].sort(c)[[...myMap].length - 2][1] + '`\n'
                    }
                    if ([...myMap][[...myMap].length - 1][0] == n) {
                        return w += users[n] + ' **' + await message.guild.members.fetch({ n, force: true }).user.username + '**: `' + u + '`\n'
                    }
                    return w += users[n] + ' **' + await message.guild.members.fetch({ n, force: true }).user.username + '**: ' + u + '\n'
                })

                myMap.forEach((gg, ggg) => {
                    pp.push(gg)
                })
                function c(a, b) {
                    if (a[1] === b[1]) {
                        return 0
                    } else {
                        return (a[1] < b[1]) ? -1 : 1
                    }
                }
                w += '**Skips**: ' + skiped + '\n'


                message.channel.send(w)
                if (skiped > [...myMap][[...myMap].length - 1][1]) {
                    return message.channel.send('Skipped!')
                } else if ([...myMap].sort(c)[[...myMap].length - 1][1] == [...myMap].sort(c)[[...myMap].length - 2][1]) {
                    return message.channel.send('Tie!')
                } else {
                    message.channel.send('<@' + [...myMap][[...myMap].length - 1][0] + '> has been ejected!')
                    message.channel.updateOverwrite(client.users.cache.get([...myMap][[...myMap].length - 1][0]), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false,
                    })
                    message.channel.send([...myMap][[...myMap].length - 1][0] == dat.amogus.impostorGame ? 'He/she was the impostor.' : 'He/she was not the impostor.')
                    if ([...myMap][[...myMap].length - 1][0] == dat.amogus.impostorGame) {
                        let em = ''
                        Object.entries(users).forEach((hh, vv) => {
                            if (Object.keys(hh)[0] !== dat.amogus.impostorGame) em += Object.values(hh)[1]
                        })
                        message.channel.send(em + ' **Victory!**\nDeleting the channel in 10s!').then(() => {
                            setTimeout(() => {
                                message.channel.delete()
                            }, 10000)
                        })
                    }
                    delete users[[...myMap][[...myMap].length - 1][0]]
                    delete [...myMap][[...myMap].length - 1]
                    await schema.findOneAndUpdate({ id: message.guild.id }, dat, { upset: true })

                }
                coll.stop()
                myMap = new Map()
                clickers = []
                um = []
            }, 50000)
        })

    })
};

module.exports.help = {
    aliases: [],
    name: 'emergency',
    description: '',
    usage: config.prefix + 'ban @user %reason%',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'amogus',
    disable: false,
    cooldown: 50000,
};