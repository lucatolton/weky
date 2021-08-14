
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const config = require('../../util/config.json');
const fs = require('fs');

module.exports.run = async (client, message, args, utils, data) => {
  const helps = [
    {
      emoji: '854244532039450675',
      name: 'RPG',
      description: 'Get commands of the category RPG!',
      id: 'rpg'
    },
    {
      emoji: '859790691579723806',
      name: 'Currency',
      description: 'Get commands of the category Currency!',
      id: 'currency'
    },
    {
      emoji: '😂',
      name: 'Fun',
      description: 'Get commands of the category Fun!',
      id: 'fun'
    },
    {
      emoji: '⚒️',
      name: 'Moderation',
      description: 'Get commands of the category Moderation!',
      id: 'moderation'
    },
    {
      emoji: '🔩',
      name: 'Utility',
      description: 'Get commands of the category Utility!',
      id: 'utility'
    },
    {
      emoji: '🎮',
      name: 'Games',
      description: 'Get commands of the category Games!',
      id: 'games'
    },
    {
      emoji: '📷',
      name: 'Image',
      description: 'Get commands of the category Image!',
      id: 'image'
    },
    {
      emoji: '836284406372499557',
      name: 'Soundboard',
      description: 'Get commands of the category Soundboard!',
      id: 'soundboard'
    },
    {
      emoji: '847534956619104307',
      name: 'Button Roles',
      description: 'Get commands of the category Br!',
      id: 'br'
    },
  ]
 let bbb = await helps.forEach((thing) => {
    return {
      label: thing.name,
      value: thing.id,
      description: thing.description,
      emoji: thing.emoji,
    }
  })

  const theArrayThing = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId('help')
    .setPlaceholder('Click me!')
    .addOptions(
      helps.map((thing) => {
        return {
          label: thing.name,
          value: thing.id,
          description: thing.description,
          emoji: thing.emoji,
        }
      })
    )
  )
  message.channel.send({ files: ['https://cdn.discordapp.com/attachments/863353802458660875/872444919002828890/Untitled_32.png'], components: [theArrayThing] }).then(async (msg) => {
    
  const filter = c => c
    const collector = await msg.createMessageComponentCollector({ filter, componentType: "SELECT_MENU", time: 50000 })

    collector.on('collect', async menu => {

      const categoryArray = fs.readdirSync('./commands/');
      const category = categoryArray.filter(x => x === menu.values[0]).join('');

      const cmds = client.commands.filter(x => x.config.category.toLowerCase() === category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(',');
      const cmdsEmbed = new MessageEmbed()
        .setTitle(`${category.slice(0, 1).toUpperCase()}${category.slice(1)}`)
        .setDescription('Also check out our [Discord Server](https://discord.gg/pH6UN3sY) and try [Nuggies](https://top.gg/bot/779741162465525790) :)\n\n' + cmds)
        .setThumbnail(client.user.avatarURL({ type: 'png' }))
        .setColor('RANDOM');
      return menu.reply({ embeds: [cmdsEmbed], ephemeral: true });
    })
  })
  if (args[0]) {
    if (client.commands.has(args[0])) {
      const cmd = client.commands.get(args[0]);

      return message.channel.send({ content: '```md\n' +
        '# Description\n' + '> ' + cmd.help.description + '\n' +
        '# Usage\n' + '> ' + cmd.help.usage + '\n' +
        '# Aliases\n' + '> ' + cmd.help.aliases.join('︱') + '\n' +
        '# Category\n' + '> ' + cmd.config.category + '\n' +
        '# Description\n' + '> ' + cmd.config.disable + '\n' + '\n```' });
    } else {
      return message.reply({ content: 'I can\'t find that command!'});
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