
const Discord = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports.run = async (client, message, args, utils, data) => {
	const channel = message.member.voice.channel;
	if(!channel) return message.channel.send('Please connect to a voice channel to use soundboard');
	channel.join().then(async connection => {
		const dispatcher = connection.play(path.join(__dirname + '/audio/gasgasgas.mp3'));
        dispatcher.on('speaking', async speaking => {
            if (!speaking) {
                channel.leave();
                const disbut = require('discord-buttons')
                let id = utils.randomID(50)
                let btn = new disbut.MessageButton()
                    .setStyle('green')
                    .setLabel('Play Again')
                    .setID(id);
                let msg = await message.channel.send('_ _', { component: btn });

                const filter = m => m.clicker.user.id == message.author.id
                let c = msg.createButtonCollector(filter)
                c.on('collect', async (button) => {
                    if (button.id === id) {
                        await button.reply.defer();
                        channel.join().then(async connection => {
                            const dispatcher = connection.play(path.join(__dirname + '/audio/error.mp3'));
                            dispatcher.on('speaking', speaking => {
                                if (!speaking) {
                                    channel.leave();

                                }
                            });
                        })
                    }
                });
            }
        });
    }).catch(err => console.log(err));
};

module.exports.help = {
	aliases: ['gas', 'gasgas'],
	name: 'gasgasgas',
	description: 'Plays the "gasgasgas" meme',
	usage: 'wek gasgasgas',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'soundboard',
	cooldown: 5000,
	disable: false,
};