
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {


  const DIG = require('discord-image-generation');
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
  let avatar = member.user.displayAvatarURL({ format: 'jpg' })
  let img = await new DIG.Stonk().getImage(avatar)
  let attach = new Discord.MessageAttachment(img, 'stonks.png');;
  message.channel.send(attach)

};

module.exports.help = {
  aliases: [],
  name: 'stonks',
  description: 'Stonks.',
  usage: config.prefix + 'stonks {none OR @user}',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'image',
  disable: false,
  cooldown: 1000,
};