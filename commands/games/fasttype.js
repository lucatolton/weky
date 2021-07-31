


const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { FastType } = require('weky')
  await FastType({
    message: message,
    embed: {
        title: 'FastType | Weky Development',
        description: 'You have **{{time}}** to type the below sentence.',
        color: '#7289da',
        timestamp: true
    },
    sentence: 'This is a sentence!',
    winMessage: 'GG, you have a wpm of **{{wpm}}** and You made it in **{{time}}**.',
    loseMessage: 'Better luck next time!',
    cancelMessage: 'You ended the game!',
    time: 60000,
    buttonText: 'Cancel',
    othersMessage: 'Only <@{{author}}> can use the buttons!'
});
};

module.exports.help = {
  aliases: ['fastt', 'ff'],
  name: 'fasttype',
  description: 'Weky npm game.',
  usage: config.prefix + 'fasttype',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};
