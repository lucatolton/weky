

const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Util, MessageEmbed } = require("discord.js");
  const { parse } = require("twemoji-parser");
  if (!message.member.hasPermission("MANAGE_EMOJIS")) return utils.errorEmbed('You don\'t have the permissions to manage emojis')
  const emoji = args[0];
  const name = args.slice(1).join(" ");

  if (!emoji) {
    return utils.errorEmbed(`Please Give Me A Emoji!`, message);
  }
  if (!name) {
    return utils.errorEmbed(`No emoji name specified`, message)
  }
  try {
    if (emoji.startsWith("https://cdn.discordapp.com")) {
      const fb = await message.guild.emojis.create(emoji, name || name);

      return message.channel.send('<:' + Util.parseEmoji(fb).name + ':' + Util.parseEmoji(fb).id + `> has been added as \`${name}\``);
    }

    const customEmoji = Util.parseEmoji(emoji);

    if (customEmoji.id) {
      const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${customEmoji.animated ? "gif" : "png"
        }`;

      let fb = await message.guild.emojis.create(
        `${link}`,
        `${name || `${customEmoji.name}`}`
      );
      return message.channel.send('<:' + Util.parseEmoji(fb).name + ':' + Util.parseEmoji(fb).id + `> has been added as ${name}`);
    } else {
      const foundEmoji = parse(emoji, { assetType: "png" });
      if (!foundEmoji[1]) {
        return message.channel.send("I can't work with this!");
      }

      message.channel.send(
        "Bruv this is a normal emoji what you can use anywhere"
      );
    }
  } catch (e) {
    if (
      String(e).includes("DiscordAPIError: Maximum number of emojis reached (50)")) {
      return utils.errorEmbed("Maximum emoji count reached for this Server!", message);
    }
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