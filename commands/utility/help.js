
const { MessageEmbed } = require('discord.js');
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const config = require('../../util/config.json');
const fs = require('fs');

module.exports.run = async (client, message, args, utils, data) => {
  const prefix = config.prefix
  const helps = [
    {
      emoji: '😂',
      name: 'Fun',
      description: 'Get a list of the commands with the category Fun!',
      id: 'fun'
    },
    {
      emoji: '854244532039450675',
      name: 'RPG',
      description: 'Get a list of the commands with the category RPG!',
      id: 'rpg'
    },
    {
      emoji: '⚒️',
      name: 'Moderation',
      description: 'Get a list of the commands with the category Moderation!',
      id: 'moderation'
    },
    {
      emoji: '🔩',
      name: 'Utility',
      description: 'Get a list of the commands with the category Utility!',
      id: 'utility'
    },
    {
      emoji: '🎮',
      name: 'Games',
      description: 'Get a list of the commands with the category Games!',
      id: 'games'
    },
    {
      emoji: '📷',
      name: 'Image',
      description: 'Get a list of the commands with the category Image!',
      id: 'image'
    },
    {
      emoji: '836284406372499557',
      name: 'Soundboard',
      description: 'Get a list of the commands with the category Soundboard!',
      id: 'soundboard'
    },
    {
      emoji: '847534956619104307',
      name: 'Button Roles',
      description: 'Get a list of the commands with the category Br!',
      id: 'br'
    },
  ]
  const theArrayThing = new MessageMenu()
    .setID('help')
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder('Click me!')

  helps.forEach((thing) => {
    theArrayThing.addOption(new MessageMenuOption()
      .setLabel(thing.name)
      .setValue(thing.id)
      .setDescription(thing.description)
      .setEmoji(thing.emoji)
      .setDefault())
  })

  message.channel.send(new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/796339751044382720/872215137954697288/Untitled_11.jpg'), { components: theArrayThing }).then((msg) => {

    const collector = await msg.createMenuCollector(c => c)

    collector.on('collect', async menu => {

      console.log(menu.values)
      const categoryArray = fs.readdirSync('./commands/');
      const category = categoryArray.filter(x => x === args[0].toLowerCase()).join('');

      const cmds = client.commands.filter(x => x.config.category.toLowerCase() === category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(',');
      const cmdsEmbed = new MessageEmbed()
        .addField(
          `${category.slice(0, 1).toUpperCase()}${category.slice(1)}`,
          'Also check out our [Discord Server](https://discord.gg/pH6UN3sY) :)'
        )
        .setDescription(cmds)
        .setThumbnail(client.user.avatarURL({ type: 'png' }))
        .setColor('RANDOM');
      return message.channel.send(cmdsEmbed);
    })
  })
  if (client.commands.has(args[0])) {
    const cmd = client.commands.get(args[0]);

    return message.channel.send('```md\n' +
      '# Description\n' + '> ' + cmd.help.description + '\n' +
      '# Usage\n' + '> ' + cmd.help.usage + '\n' +
      '# Aliases\n' + '> ' + cmd.help.aliases.join('︱') + '\n' +
      '# Category\n' + '> ' + cmd.config.category + '\n' +
      '# Description\n' + '> ' + cmd.config.disable + '\n' + '\n```');
  } else {
    return message.reply('I can\'t find that command!');
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