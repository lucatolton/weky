
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  var randomWords = require('random-words');
  const word = randomWords()

  const { ShuffleGuess } = require('weky')
  await ShuffleGuess({
    message: message,
    embed: {
      title: 'Shuffle Guess | Weky Development',
      color: '#7289da',
      timestamp: true,
    },
    word: word,
    button: { cancel: 'Cancel', reshuffle: 'Reshuffle' },
    startMessage:
      'I shuffled a word it is **`{{word}}`**. You have **{{time}}** to find the correct word!',
    winMessage:
      'GG, It was **{{word}}**! You gave the correct answer in **{{time}}.**',
    loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
    incorrectMessage: "No {{author}}! The word isn't `{{answer}}`",
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    time: 60000,
  });
};

module.exports.help = {
  aliases: ['shuffleguess'],
  name: 'suffle-guess',
  description: 'Shuffle guess game.',
  usage: config.prefix + '8ball %question%',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'fun',
  disable: false,
  cooldown: 1000,
};