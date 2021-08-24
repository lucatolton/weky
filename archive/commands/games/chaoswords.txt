


const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { ChaosWords } = require('weky')

  var randomWords = require('random-words');
  const words = randomWords(5) //generating 2 words

  await ChaosWords({
    message: message,
    embed: {
        title: 'ChaosWords | Weky Development',
        description: 'You have **{{time}}** to find the hidden words in the below sentence.',
        color: '#7289da',
        field1: 'Sentence:',
        field2: 'Words Found/Remaining Words:',
        field3: 'Words found:',
        field4: 'Words:',
        timestamp: true
    },
    winMessage: 'GG, You won! You made it in **{{time}}**.',
    loseMessage: 'Better luck next time!',
    wrongWordMessage: 'Wrong Guess! You have **{{remaining_tries}}** tries left.',
    correctWordMessage: 'GG, **{{word}}** was correct! You have to find **{{remaining}}** more word(s).',
    time: 60000,
    words: words,
    charGenerated: 17,
    maxTries: 10,
    buttonText: 'Cancel',
    othersMessage: 'Only <@{{author}}> can use the buttons!'
});
};

module.exports.help = {
  aliases: ['chaos', 'cw'],
  name: 'chaoswords',
  description: 'Weky npm game.',
  usage: config.prefix + 'chaoswords',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};
