


const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Fight } = require('weky')
  if(!message.mentions.users.first()) return message.reply('No user specified!')
  await Fight({
    message: message,
    opponent: message.mentions.users.first(),
    embed: {
        title: 'Fight | Weky Development',
        color: '#7289da',
        timestamp: true
    },
    buttons: {
      hit: 'Hit',
      heal: 'Heal',
      cancel: 'Stop',
      accept: 'Accept',
      deny: 'Deny'
    },
    acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
    winMessage: 'GG, <@{{winner}}> won the fight!',
    endMessage: '<@{{opponent}}> didn\'t answer in time. So, I dropped the game!',
    cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
    fightMessage: '{{player}} you go first!',
    opponentsTurnMessage: 'Please wait for your opponents move!',
    highHealthMessage: 'You cannot heal if your HP is above 80!',
    lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
    returnWinner: false,
    othersMessage: 'Only {{author}} can use the buttons!'
});
};

module.exports.help = {
  aliases: [],
  name: 'fight',
  description: 'Weky npm game.',
  usage: config.prefix + 'fight @user',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};
