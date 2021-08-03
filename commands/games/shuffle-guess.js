
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  var randomWords = require('random-words');
  const word = randomWords()

  const { ShuffleGuess } = require('weky')
  await ShuffleGuess({
    message: message,
    embed: {
      title: 'Shuffle Gues',
      color: 'RANDOM',
      timestamp: true,
    },
    word: word,
    button: { cancel: 'Cancel', reshuffle: 'Reshuffle' },
    startMessage:'I shuffled a word it is **`{{word}}`**. You have `{{time}}` to find the correct word!',
    winMessage:'GG, It was **`{{word}}`**! It took you `{{time}}`.',
    loseMessage: 'The correct answer was `{{answer}}`. Ya lost, rip..',
    incorrectMessage: "The word is not `{{answer}}` xd",
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    time: 60000,
  });
};

module.exports.help = {
  aliases: ['shuffleguess'],
  name: 'suffle-guess',
  description: 'Shuffle guess game.',
  usage: config.prefix + 'shuffle-guess',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};