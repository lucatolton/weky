

const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Trivia } = require('weky');

  const low = ["easy", "medium", "hard"]
  var diff = args[0]

  if (!diff || !low.includes(diff)) return message.reply('Please choose a difficulty, list: `easy`, `medium`, `hard`')

  await Trivia({
    message: message,
    embed: { color: '#7289da', timestamp: true },
    difficulty: diff,
    thinkMessage: 'I am thinking...',
    winMessage:
      'GG, It was **{{answer}}**. It took you **{{time}}**.',
    loseMessage: 'The correct answer was **{{answer}}**...',
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
  aliases: [],
  name: 'trivia',
  description: 'Trivia game.',
  usage: config.prefix + 'trivia',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};
