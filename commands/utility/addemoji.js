

const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Util } = require("discord.js");
  if (!message.member.hasPermission("MANAGE_EMOJIS")) return utils.errorEmbed('You don\'t have the permissions to manage emojis')
  const emoji = args[0];
  let name = args.slice(1).join(" ");

  if (!emoji) {
    return utils.errorEmbed(message, `Please Give Me A Emoji!`);
  }
  if (!name) return name = 'not_specified'

  try {
    if (emoji.startsWith("https://cdn.discordapp.com")) {
      const fb = await message.guild.emojis.create(emoji, name || name);

      return message.channel.send('<:' + Util.parseEmoji(fb).name + ':' + Util.parseEmoji(fb).id + `> has been added as \`${name}\``);
    }

    const customEmoji = Util.parseEmoji(emoji);

    if (customEmoji.id) {
      const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${customEmoji.animated ? "gif" : "png"}`;

      let fb = await message.guild.emojis.create(`${link}`, `${name || `${customEmoji.name}`}`);
      console.log(Util.parseEmoji(fb))
      return message.channel.send('<:' + Util.parseEmoji(fb).name + ':' + Util.parseEmoji(fb).id + `> has been added as \`${name}\``);
    } else {
      message.channel.send("I can't work with this!");
    }
  } catch (e) {
    console.log(e)
    return utils.errorEmbed(message, e.message);
  }
};

module.exports.help = {
  aliases: ['ae'],
  name: 'addemoji',
  description: 'Add a emoji',
  usage: config.prefix + 'addemoji %link%',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'utility',
  disable: false,
  cooldown: 1000,
};