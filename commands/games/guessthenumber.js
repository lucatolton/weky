

const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Trivia } = require('weky');

  await Trivia({
    message: message,
    embed: { color: '#7289da', timestamp: true },
    difficulty: 'hard',
    thinkMessage: 'I am thinking',
    winMessage:
      'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
    loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
    emojis: {
      one: '1️⃣',
      two: '2️⃣',
      three: '3️⃣',
      four: '4️⃣',
    },
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    returnWinner: false,
  });
};

module.exports.help = {
  aliases: ['gtn'],
  name: 'guessthenumber',
  description: 'Guess The Number game.',
  usage: config.prefix + 'guessthenumber',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};