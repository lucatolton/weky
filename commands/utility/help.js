
const { MessageEmbed } = require('discord.js');
const config = require('../../util/config.json');
const fs = require('fs');



module.exports.run = async (client, message, args, utils, data) => {
  const prefix = 'wek ';
  if (!args[0]) {
    const a = new MessageEmbed()
      .setTitle('Hello!')
      .setDescription('I\'m Weky!\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=809496186905165834&permissions=1609952759&scope=applications.commands%20bot) | [Support Server](https://discord.gg/Sr2U5WuaSN) | [Premium](https://www.patreon.com/weky)')
      .addField("😂 Fun", `\`${prefix}help fun\``, true)
      .addField("<:orix_tecRPG:854244532039450675> RPG", `\`${prefix}help rpg\``, true)
      .addField(utils.emojis.aero + ' Currency', `\`${prefix}help currency\``, true)
      .addField("⚒️ Moderation", `\`${prefix}help moderation\``, true)
      .addField("🔩 Utility", `\`${prefix}help utility\``, true)
      .addField("🎮 Games", `\`${prefix}help games\``, true)
      .addField("📷 Image", `\`${prefix}help image\``, true)
      .addField('<a:disk:836284406372499557> Soundboard', `\`${prefix}help soundboard\``, true)
      .addField('<:click:847534956619104307> Button role', `\`${prefix}help br\``, true)
      // .addField('<:sussyBaka:852084751388377089> Among Us', `\`${prefix}help amogus\``, true)
      // .addField('<:blurpletada:856098746790314014> Giveaway', `\`${prefix}help giveaway\``, true)
      .setFooter('Check out our Discord Server:  https://discord.gg/pH6UN3sY')
      .setThumbnail(client.user.avatarURL({ type: 'png' }))
      .setColor('RANDOM');
    message.channel.send(a);
  }
  else {
    const categoryArray = fs.readdirSync('./commands/');
    const category = categoryArray.filter(x => x === args[0].toLowerCase()).join('');
    if (category) {
      const cmds = client.commands.filter(x => x.config.category.toLowerCase() === category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join('︱');
      const cmdsEmbed = new MessageEmbed()
        .setTitle(`${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`)
        .setDescription(cmds)
        .setColor('RANDOM')
      return message.channel.send(cmdsEmbed);
    }
    else if (client.commands.has(args[0])) {
      const cmd = client.commands.get(args[0]);

      return message.channel.send('```md\n' +
        '# Description\n' + '> ' + cmd.help.description + '\n' +
        '# Usage\n' + '> ' + cmd.help.usage + '\n' +
        '# Aliases\n' + '> ' + cmd.help.aliases.join('︱') + '\n' +
        '# Category\n' + '> ' + cmd.config.category + '\n' +
        '# Description\n' + '> ' + cmd.config.disable + '\n' + '\n```');
    }
    else {
      return message.reply('I can\'t find that command!');
    }
  }
};
module.exports.help = {
  aliases: ['about'],
  name: 'help',
  description: '😔 Need help? This is the right command for you!',
  usage: config.prefix + 'help',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Information',
  disable: false,
  cooldown: 1000,
};