


const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Calculator } = require('weky')
  await Calculator({
    message: message,
    embed: {
      title: 'Calculator | Weky Development',
      color: '#7289da',
      timestamp: true
    },
    disabledQuery: 'Calculator is disabled!',
    invalidQuery: 'The provided equation is invalid!',
    othersMessage: 'Only <@{{author}}> can use the buttons!'
  });
};

module.exports.help = {
  aliases: ['calc', 'math'],
  name: 'calculator',
  description: 'Makes ur homework.',
  usage: config.prefix + 'calculator',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};
