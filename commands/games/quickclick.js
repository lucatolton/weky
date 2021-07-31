
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
    const { QuickClick } = require('weky');
    await QuickClick({
        message: message,
        embed: {
            title: 'Quick Click | Weky Development',
            color: '#7289da',
            timestamp: true,
        },
        time: 60000,
        waitMessage: 'The buttons may appear anytime now!',
        startMessage:
            'First person to press the correct button will win. You have **{{time}}**!',
        winMessage: 'GG, <@{{winner}}> pressed the button in **{{time}} seconds**.',
        loseMessage: 'No one pressed the button in time. So, I dropped the game!',
        emoji: '👆',
        ongoingMessage:
            "A game is already runnning in <#{{channel}}>. You can't start a new one!",
    });
};

module.exports.help = {
    aliases: ['qc'],
    name: 'quickclick',
    description: 'Quick Click game.',
    usage: config.prefix + 'quickclick',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'games',
    disable: false,
    cooldown: 1000,
};