
                
                const Discord = require('discord.js');
                const config = require('../../util/config.json');
                const disbut = require('discord-buttons')  

                module.exports.run = async (client, message, args, utils, data) => {
       let id1 = utils.randomID(6)
  if(!message.member.hasPermission('BAN_MEMBERS')){
        return message.channel.send("You don't have permission to use that command.")
    }
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I dont have permission to ban members.')
    //lets

    let question = args.slice(2).join(" ");
    const user = message.mentions.users.first();
    //if
    if (!user){
        return message.channel.send('Who you want to ban?')
    }
    if(!question) question = 'no reason'
    if(user.id === message.author.id) return
    let embed = new Discord.MessageEmbed()
    .setDescription(`<:banhammer:815941402469990440> Banning ${user.username}#${user.discriminator} for **${question}**?`)
    const newMessage = await message.channel.send(embed)
               
                  newMessage.react("✅").then(() => newMessage.react("❌"));
              
                  const filter = (reaction, user) => {
                      return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
                  };
              
                  newMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                  .then(async collected => {
                      const reaction = collected.first();
              
                      if (reaction.emoji.name === "✅") {
                         
                         //embed
                         let embed = new Discord.MessageEmbed()
                         .setDescription(`**<:banhammer:815941402469990440> Ban hammer hit'd!**\nUser:\`\`\`${user.tag}\`\`\`\nReason:\`\`\`${question}\`\`\`\nModerator:\`\`\`${message.author.tag}\`\`\``)
                         let btn = new disbut.MessageButton()
                         .setStyle('red')
                         .setLabel('undo')
                         .setID(id1);
                         let msg = await message.channel.send({embed: embed, component:btn});
                         client.on('clickButton', async (button) => {
                           if (button.id === id1){
                            await button.reply.defer();
                            if (!button.clicker.member.permissions.has("MANAGE_CHANNELS")) return;
                                  button.channel.send(new Discord.MessageEmbed()
                                  .setDescription(`UNDO | ${user.username}#${user.discriminator} has been unbanned`)
                                  )
  
                                   btn = new disbut.MessageButton()
                         .setStyle('red')
                         .setLabel('undo')
                         .setID(id1)
                         .setDisabled(true)
                                   msg.edit({embed: embed, component:btn})
                                   message.guild.members.unban(user);
                          }
                      });
                         //action
                         message.guild.members.ban(user);
                      } else {
                          let embed = new Discord.MessageEmbed()
                          .setColor('RANDOM')
                          .setTitle("Ok, nothing will happen")
          
                      message.channel.send(embed);
                      }
                  })
                  .catch(collected => {

                      let embed = new Discord.MessageEmbed()
                          .setColor('RANDOM')
                          .setDescription("Ok we will keep this user here.");
          
                      message.channel.send(embed);
                  });

                };
                
                module.exports.help = {
                    aliases: ['dababybanusertralala'],
                      name:'ban',
                      description: 'Banning a user/bot.',
                      usage: config.prefix + 'ban @user %reason%',
                  };
                
                module.exports.config = {
                  args: false,
                  restricted: false,
                  category: 'moderation',
                  disable: false,
                  cooldown: 1000,
                };