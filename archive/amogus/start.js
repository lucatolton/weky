

const config = require('../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {

    const schema = require("../../schemas/Guild")


    await schema.findOne({ id: message.guild.id }, async (err, dat) => {

        if (dat.amogus.enabled == false) return message.channel.send('Among us is not enabled in this guild!')
        if (dat.amogus.isThereAlreadyAGame == true) return message.channel.send('A game is already running!')

        let mentions = message.mentions.members

        if (mentions.size < 5) return message.channel.send('You need min 4 users to start!')

        let names = ['sussy-mogus', 'amogus-play', 'a-amogus-game', 'um-baka', 'lol-red-vent']
        let channelName = names[Math.floor(Math.random() * names.length)]
        let array = ''
        let i = -1
        let emojis = utils.shuffleArray([
            '<:yellowCrewmate:869888214406684713>',
            '<:whiteCrewmate:869888340088999987>',
            '<:redCrewmate:869888409261465631>',
            '<:blackCrewmate:869890149507530782>',
            '<:cyanCrewmate:869888839852912680>',
            '<:greenCrewmate:869888753009831986>',
            '<:limeCrewmate:869888693668818964>',
            '<:orangeCrewmate:869888624831901726>',
            '<:pinkCrewmate:869888555491688448>',
            '<:purpleCrewmate:869888477263704105>',
        ])

        mentions.array().forEach(async (b) => {

            async function f() {
                if (i !== mentions.size) {
                    i++
                    dat.amogus.isThereAlreadyAGame = true
                    dat.amogus.whoIsInGame[b.user.id] = emojis[i]

                    await schema.findOneAndUpdate({ id: message.guild.id }, dat, { upset: true })
                }
            }
            f()
            array += dat.amogus.whoIsInGame[b.user.id] + ' <@' + b.user.id + '>\n'
        })

        let channel = await message.guild.channels.create(channelName, {
            type: "text",
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ],
        })
        dat.amogus.inWhatChannel = channel.id
        mentions.array().forEach((e) => {
            channel.updateOverwrite(e, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
            })
        })

        channel.send('Welcome everyone to this among us mini game!\n\n' +
            'I will dm a random user from this lobby so they will know they are the impostor! Please open dms... dming in 5 seconds!\n\n' +
            '**Rules**:\n- Impostor must type 100 messages to win!\n- Crewmates must eject the impostor within\' `wek emergency`!\n' +
            'Good luck!').then((x) => x.pin())
        channel.send(array)

        channel.setRateLimitPerUser(1)

        setTimeout(async () => {
            async function chooseImpostor() {
                message.guild.members.cache.get(mentions.array()[Math.floor(Math.random() * mentions.size)].user.id)
                    .send('You are the impostor in <#' + message.channel.id + '>, read the pinned message!')
                    .catch(async () => {
                        dat.amogus.impostorGame = null
                        await schema.findOneAndUpdate({ id: message.guild.id }, dat, { upset: true })

                        channel.send('User had dms closed... choosing another user...');
                        await chooseImpostor()
                    })
                dat.amogus.impostorGame = mentions.array()[Math.floor(Math.random() * mentions.size)].user.id
                await schema.findOneAndUpdate({ id: message.guild.id }, dat, { upset: true })

            }
            await chooseImpostor()
        }, 5000)
    })
};

module.exports.help = {
    aliases: [],
    name: 'start',
    description: 'Start a game.',
    usage: config.prefix + 'start <4-10Mentions>',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'amogus',
    disable: false,
    cooldown: 1000,
};