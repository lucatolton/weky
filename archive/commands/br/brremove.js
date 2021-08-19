
                       
const Discord = require('discord.js');
const config = require('../../util/config.json');
const rrschema = require('../../schemas/reactionrole');

module.exports.run = async (client, message, args, utils, data) => {
      if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send("You don't have permission to use that command.")
    }
  const messageid = args[0];
  if (isNaN(messageid)) return message.reply('The message ID needs to be a number.');
  await rrschema.findOne({
    GuildID: message.guild.id,
    MessageID: messageid,
  }, async (err, data) => {
    if (err) throw err;
    if (!data || typeof data == null) return message.reply('Cannot fetch button role. Double check ID.');
    if (data) {
      rrschema.findOneAndDelete({
        GuildID: message.guild.id,
        MessageID: messageid,
      }, (err) => {
        if (err) throw err;
      });
      console.log(data.ChannelID)
      console.log(data.MessageID)
      const channel = message.guild.channels.cache.get(data.ChannelID);
      const msg = channel.messages.cache.get(data.MessageID);
      msg.delete();
      const done = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Button role with ID `' + data.ID + '` is deleted.')
        .setColor('GREEN')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: false }));
      return message.channel.send(done);
    }
  });
};

module.exports.help = {
    aliases: ['brremove'],
      name: 'brdelete',
      description: 'Remove a button reaction.',
      usage: config.prefix + 'brdelete',
  };

module.exports.config = {
	args: false,
	restricted: false,
	category: 'br',
	disable: false,
	cooldown: 1000,
};