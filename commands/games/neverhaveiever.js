

const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
    const { NeverHaveIEver } = require('weky');
await NeverHaveIEver({
	message: message,
	embed: {
		title: 'Never Have I Ever | Weky Development',
		color: '#7289da',
		timestamp: true,
	},
	thinkMessage: 'I am thinking',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttons: { optionA: 'Yes', optionB: 'No' },
});
};

module.exports.help = {
    aliases: ['nhie'],
    name: 'neverhaveiever',
    description: 'Never Have I Ever game.',
    usage: config.prefix + 'neverhaveiever',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'games',
    disable: false,
    cooldown: 1000,
};