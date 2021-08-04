

const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Snake } = require('weky');
  await Snake({
    message: message,
    embed: {
      title: 'Snake',
      description: 'GG, you scored **{{score}}** points!',
      color: 'RANDOM',
      timestamp: true,
    },
    emojis: {
      empty: '⬛',
      snakeBody: '<a:trollfacegaming:872068688386347048>',
      food: '🚎',
      up: '⬆️',
      right: '⬅️',
      down: '⬇️',
      left: '➡️',
    },
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    buttonText: 'Cancel',
  });
};

module.exports.help = {
  aliases: [],
  name: 'snake',
  description: 'Snake game.',
  usage: config.prefix + 'snake',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};