
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
    const { LieSwatter } = require('weky');
    await LieSwatter({
        message: message,
        embed: {
            title: 'Lie Swatter | Weky Development',
            color: '#7289da',
            timestamp: true,
        },
        thinkMessage: 'I am thinking',
        winMessage:
            'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
        loseMessage: 'Better luck next time! It was a **{{answer}}**.',
        othersMessage: 'Only <@{{author}}> can use the buttons!',
        buttons: { true: 'Truth', lie: 'Lie' },
    });
};

module.exports.help = {
    aliases: ['lw'],
    name: 'liswatter',
    description: 'Lie Swatter game.',
    usage: config.prefix + 'lieswatter',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'games',
    disable: false,
    cooldown: 1000,
};