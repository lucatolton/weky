const Discord = require('discord.js');
const utils = require('../util/utils');
const fetch = require('node-fetch');
const requiredUserDB = require('../schemas/userDB')
const pms = require('pretty-ms')

module.exports = async (client, message) => {

	if (message.author.bot || !message.guild) return;

	require("../schemas/userDB").findOne({ id: message.author.id }, async (err, dataUser) => {
		const guildDB = await client.data.getGuildDB(message.guild.id);
		// 		const guildDB2 = await require("../schemas/Guild").findOne({ id: message.guild.id })
		const userDB = await client.data.getUserDB(message.author.id);
		const rpgDB = await client.data
		const data = {};
		data.guild = guildDB;
		data.user = userDB;
		data.rpg = rpgDB
 
		if (data.user.blacklisted == true) return;


		// 		if (guildDB2.amogus.impostorGame == message.author.id && guildDB2.amogus.inWhatChannel == message.channel.id) {
		// 			if (!client.tempCollector[message.author.id]) client.tempCollector[message.author.id] = 0
		// 			client.tempCollector[message.author.id] += 1

		// 			if (client.tempCollector[message.author.id] == 10 && guildDB2.amogus.isThereAlreadyAGame) {

		// 				let i = 0
		// 				let a = []
		// 				let a2 = []
		// 				Object.keys(guildDB2.amogus.whoIsInGame).forEach((id) => {
		// 					i++
		// 					message.channel.updateOverwrite(message.guild.members.cache.get(id), {
		// 						SEND_MESSAGES: false,
		// 						VIEW_CHANNEL: true,
		// 					})
		// 					if (i <= 5) {
		// 						a.push(guildDB2.amogus.whoIsInGame[message.author.id] + ' 🔪' + guildDB2.amogus.whoIsInGame[id] + '\n')
		// 					} else if (i <= 100) {
		// 						a2.push(guildDB2.amogus.whoIsInGame[message.author.id] + ' 🔪' + guildDB2.amogus.whoIsInGame[id] + '\n')
		// 					}
		// 				})
		// 				message.channel.send(a.join(''))
		// 				message.channel.send(a2.join(''))
		// 				message.channel.send(
		// 					guildDB2.amogus.whoIsInGame[message.author.id] +
		// 					'  **' + message.author.username + '**\nGG! The impostor reached 100 messages without being detected! Deleting the channel in 10s!'
		// 				).then(() => {
		// 					setTimeout(() => {
		// 						message.channel.delete()
		// 					}, 10000)
		// 				})
		// 			}
		// 		}

		if (userDB.is_afk) {
			await client.data.removeAfk(message.author.id);
			message.channel.send(Discord.Util.removeMentions('Welcome back `' + message.author.username + '`! You are no longer afk.'))
		}

		message.mentions.users.forEach(async (u) => {
			if (data.user.is_afk) {
				message.channel.send(`\`${u.tag}\` is currently afk for: \`${userData.afkReason}\``)
			}
		});
if(data.guild.chatbot_enabled){
		const channel = data.guild.chatbot_channel;
		if (!channel) return;
		const sendToChannel = message.guild.channels.cache.get(channel);

		if (sendToChannel.id == message.channel.id) {
		try {
			const fetched = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${encodeURIComponent('Weky')}&ownername=${encodeURIComponent('Face')}&user=${encodeURIComponent(message.author.id)}`, {});
			const response = await fetched.json();
			message.reply(response.message);
		}
		catch (e) {
			message.reply('Something went wrong while fetching...');
			console.log(e);
		}
        }
}
		const prefix = 'wek '
		if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
			const m = new Discord.MessageEmbed()
				.setTitle('Hi, I\'m Weky !')
				.setDescription('A rpg bot on Discord !')
				.addField('My prefix is `' + prefix + '`!')
				.addField('\u200b', '[Support server](https://discord.gg/Sr2U5WuaSN) | [Bot invite](https://discord.com/api/oauth2/authorize?client_id=809496186905165834&permissions=261188086870&scope=applications.commands%20bot)')
				.setColor('RANDOM');
			message.channel.send(m);
		}

		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);

		let command = args.shift().toLowerCase();

		if (dataUser.cooldowns[command] < Date.now()) await requiredUserDB.findOneAndUpdate({ id: message.author.id }, delete dataUser.cooldowns[command], { upset: true })


		if (client.aliases.has(command)) {
			command = client.commands.get(client.aliases.get(command)).help.name;
		}

		const commandFile = client.commands.get(command);

		if (!commandFile) return;

		if (client.commands.get(command).config.restricted == true) {
			if (data.user.moderator == false) {
				return utils.errorEmbed(message, 'This command is only for bot moderators.');
			}
		}

		if (client.commands.get(command).config.disable == true) {
			return utils.errorEmbed(message, 'This command is disabled!');
		}


		const cooldown = client.commands.get(command).config.cooldown;

		let value = dataUser.premium ? cooldown / 2 : cooldown

		if (dataUser.cooldowns[command] > Date.now()) {

			const timeLeft = pms(dataUser.cooldowns[command] - Date.now());
			return message.channel.send(utils.emojis.timer + ' | This command is in cooldown for `' + timeLeft + '`! Its default cooldown is ' + pms(value) + '!');
		}

		try {
			await commandFile.run(client, message, args, utils, data);

			await client.channels.cache.get('835464023163535380').send(new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription('```md' +
					'\n* Command\n> ' + command +
					'\n* Content\n> ' + message.content +
					'\n* Guild\n> ' + message.guild.name +
					'\n* User ID\n> ' + message.author.id +
					'\n* Guild ID\n> ' + message.guild.id +
					'\n```'
				)
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'jpg', dynamic: true }))
			);

			dataUser.cooldowns[command] = Date.now() + value
			await requiredUserDB.findOneAndUpdate({ id: message.author.id }, dataUser, { upset: true })
		} catch (error) {

			await client.channels.cache.get('835185415224950794').send(errEmbed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription('```md' +
					'\n# ERROR\n> ' + error +
					'\n* Command\n> ' + command +
					'\n* Content\n> ' + message.content +
					'\n* Guild\n> ' + message.guild.name +
					'\n* User ID\n> ' + message.author.id +
					'\n* Guild ID\n> ' + message.guild.id +
					'\n```'
				)
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'jpg', dynamic: true }))
			);
			console.log(error)

			return message.channel.send(
				new Discord.MessageEmbed()
					.setTitle('Something went wrong...')
					.setDescription('Please report it in our [support server](https://discord.gg/Sr2U5WuaSN)')
					.setColor('RED')
			);
		}
	})
};
