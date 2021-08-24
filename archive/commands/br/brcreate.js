
        
                       
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
      if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send("You don't have permission to use that command.")
    }
  const Discord = require('discord.js');
  const rr = {};
  let buttonz;
  const reactionschema = require('../../schemas/reactionrole');
  const msges = new Map();
  function stop(c) {
  delete rr;
    c.stop();
    msges.forEach(m => { m.delete(); });
  }
  const role = new Discord.MessageEmbed()
  .setTitle('Button role - 1')
    .setDescription('Role, you can use `@role` or `ROLE_ID`.')
    .setFooter('Type stop to cancel')
    .setColor('RANDOM');
  const colour = new Discord.MessageEmbed()
  .setTitle('Button role - 2')
    .setDescription('Role\'s color, you can use `#FF00F0`.')
    .setFooter('Type stop to cancel')
    .setColor('RANDOM');
  const text = new Discord.MessageEmbed()
  .setTitle('Button role - 3')
    .setDescription('Text in button, you can use `:angry:` or `hello` or `\\u200B` for a empty label.')
    .setFooter('Type stop to cancel')
    .setColor('RANDOM');
    const emojiButton = new Discord.MessageEmbed()
    .setTitle('Button role - 4')
      .setDescription('Button\'s emoji (OPTIONAL | TYPE "no" to next step), you can use `EMOJI`.')
      .setFooter('Type stop to cancel')
      .setColor('RANDOM');
  const buttonColor = new Discord.MessageEmbed()
  .setTitle('Button role - 5')
    .setDescription('Button\'s color, you can use `red` or `gray` or `blurple` or `green`.')
    .setFooter('Type stop to cancel')
    .setColor('RANDOM');
  const channel = new Discord.MessageEmbed()
  .setTitle('Button role - 6')
    .setDescription('Channel, you can use `#channel` or `CHANNEL_ID`.')
    .setFooter('Type stop to cancel')
    .setColor('RANDOM');
  const title = new Discord.MessageEmbed()
  .setTitle('Button role - 7')
    .setDescription('Embed\'s title, you can use `TEXT_HERE`.')
    .setFooter('Type stop to cancel')
    .setColor('RANDOM');
  const description = new Discord.MessageEmbed()
  .setTitle('Button role - 8')
    .setDescription('Embed\'s description, you can use `TEXT_HERE`.')
    .setFooter('Type stop to cancel')
    .setColor('RANDOM');

      const filter = m => m.author.id === message.author.id;
      let msg = await message.channel.send(role);
      let step = 0;
      const collector = message.channel.createMessageCollector(filter, { max: 8 });
      collector.on('collect', async (stuff) => {
        msges.set(msg.id, msg);
        if (stuff.content.toLowerCase() === 'stop' || stuff.content.toLowerCase() === 'close' || stuff.content.toLowerCase() === 'cancel') {
          stuff.channel.send('Stopped...');
          return stop(collector);
        }
        step += 1;
        if (step == 1) {
          const role = stuff.guild.roles.cache.get(stuff.content) || stuff.mentions.roles.first();
          if (!role) {
            stuff.reply('That is not a valid role...');
            return stop(collector);
          }
          rr.role = role.id;
          return msg = await message.channel.send(colour);
        }
        else if (step === 2) {
          const embedcolour = stuff.content;
          const reg = new RegExp('^#[0-9A-F]{1,6}$');
          if (reg.test(embedcolour)) {
            rr.colour = embedcolour;
            return msg = await message.channel.send(text);
          }
          else {
            stop(collector);
            return stuff.reply('That is not a valid hex code lmao...');
          }
        }
        else if (step === 3) {
            rr.text = stuff.content
            return msg = await message.channel.send(emojiButton);
        }
        else if (step === 4) {
          const emoji = stuff.content
          let custom = Discord.Util.parseEmoji(emoji);
          if(['no', 'false'].includes(stuff.content)){
          return msg = await message.channel.send(buttonColor);
          }else if(custom !== undefined){
            const { parse } = require('twemoji-parser')
// Executing

if (custom.id) {
  let parsed = client.emojis.cache.get(custom.id)

  if (!parsed) {return message.channel.send('Invalid emoji...')}
  rr.emoji = parsed.id
  return msg = await message.channel.send(buttonColor);
}
else {
  let parsed = parse(emoji);
  if (!parsed[0]) {stop(collector); return message.channel.send('Invalid emoji...')}
  rr.emoji = parsed[0].text
  return msg = await message.channel.send(buttonColor);
}
          }else{
            return message.channel.send('Invalid emoji...')
          }

      }
        else if (step === 5) {
          if(!['green', 'gray', 'red', 'blurple'].includes(stuff.content.toLowerCase())) return stuff.channel.send('I said, red/green/blurple/gray...')

            rr.colorButton = stuff.content;
            return msg = await message.channel.send(channel);
      }
        else if (step === 6) {
          const channel = message.guild.channels.cache.get(stuff.content) || stuff.mentions.channels.first();

          if (!channel) {
            stuff.reply('That is not a valid channel...');
             stop(collector);
          }
          rr.channel = channel;
          return msg = await message.channel.send(title);
        }
        else if (step === 7) {
          const title = stuff.content;
          rr.title = title;
          return msg = await message.channel.send(description);
        }
        else if (step === 8) {
          const description = stuff.content;
          rr.description = description;
        }
      });
  
      collector.on('end', async (nothing) => {
        function getRandomString(length) {
          var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          var result = '';
          for ( var i = 0; i < length; i++ ) {
              result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
          }
          return result
      }
      
      let randomy = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        if (!rr.text || !rr.colorButton && rr.role && rr.title && rr.description && rr.channel && rr.colour) return;
        const embed = new Discord.MessageEmbed()
          .setTitle(rr.title)
          .setDescription(rr.description)
          .setColor(rr.colour);
          const disbut = require('discord-buttons')  
          function clean(text) {
            if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
            else {return text;}
          }
          console.log(rr)
          buttonz = new disbut.MessageButton()
          .setStyle(rr.colorButton)
          .setLabel(clean(rr.text))
          .setID(randomy);
          if(rr.emoji !== undefined){
          buttonz = new disbut.MessageButton()
          .setStyle(rr.colorButton)
          .setLabel(clean(rr.text))
          .setID(randomy)
          .setEmoji(rr.emoji)
          }
          try {
          var sending = await rr.channel.send({embed: embed, component: buttonz});
        }
        catch (e) {
          if (sending) {
            sending.delete();
            return message.channel.send('Whoopsie poopsie! Error while creating button role, make sure i have permission!');
          }
          return;
        }
        const embed2 = new Discord.MessageEmbed()
          .setDescription(`Alright button role created. Click [here](https://discord.com/channels/${message.guild.id}/${rr.channel.id}/${sending.id}) to jump to it!`)
          .setColor('BLUE');
  
        if (!rr.channel.messages.cache.get(sending.id).deleted) {
          message.channel.send(embed2);
          const data = await new reactionschema({
            GuildID: message.guild.id,
            RoleID: rr.role,
            ChannelID: rr.channel.id,
            MessageID: sending.id,
            Text: rr.text,
            colorButton: rr.colorButton,
            ID: randomy,
            ClickedBy: []
          }).save();
        }
      });
};

module.exports.help = {
    aliases: ['brstart'],
      name: 'brcreate',
      description: 'Create a button role.',
      usage: config.prefix + 'brcreate',
  };

module.exports.config = {
	args: false,
	restricted: false,
	category: 'br',
	disable: false,
	cooldown: 5000,
};