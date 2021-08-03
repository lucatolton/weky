
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
    const { QuickClick } = require('weky');

    let em = ['872069400679837726', '872069438210465882', '872068688386347048']
    await QuickClick({
        message: message,
        embed: {
            title: 'Quick Click',
            color: '#7289da',
            timestamp: true,
        },
        time: 60000,
        waitMessage: 'The buttons may appear anytime!',
        startMessage: 'First person to press the correct button will win. You have `{{time}}`, go!',
        winMessage: '<@{{winner}}> pressed the button in `{{time}}s`.',
        loseMessage: 'Who the hecc ran the game and forgot to play.. shame! :rolling_eyes:',
        emoji: em[Math.floor(Math.random() * em.length)],
        ongoingMessage: "A game is already runnning in <#{{channel}}> lmfao chill",
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