/* eslint-disable valid-typeof*/

const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require('../../schemas/rpg');
module.exports.run = async (client, message, args) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		const query = { SpaceShipID: extractedData.stats.inWhatSpaceShip };
		const d = await ssSchema.findOne(query);

		if (!d) return message.reply({ content: 'I can\'t find this spaceship!' });


		if (args[0]) {
			message.react('👀');
			d.SpaceShipMessages.push(`${message.author.id}${args.slice(0).join(' ').slice(0, 200).replace(/\n/gi, '').replace(/https:/gi, 'lmfao:').replace(/`/gi, '').replace(/_/gi, '').replace(/\*/gi, '')}`);

			await ssSchema.findOneAndUpdate(query, d, { upset: true });

		}
		else {
			const messages = [];
			d.SpaceShipMessages.forEach((msg) => {
				messages.push(`**${client.users.cache.get(msg.slice(0, 18)).tag}**: ${msg.slice(18)}`);
			});

			if (extractedData.stats.isInSpaceShip == false) return message.reply({ content: 'You are not in any spaceship!' });
			if (d.SpaceShipMessages.length <= 30) {
				message.channel.send({ embeds: [
					new Discord.MessageEmbed()
						.setDescription(messages.join('\n') || 'Empty :/')
						.setTitle(d.SpaceShipName)
						.setThumbnail(d.SpaceShipIcon)
						.setColor('RANDOM')
						.setFooter('By the way you can use wek chat <text> to chat!'),
				] });
			}
			else {
				d.SpaceShipMessages = [];

				await ssSchema.findOneAndUpdate(query, d, { upset: true });

				message.channel.send({ embeds: [
					new Discord.MessageEmbed()
						.setDescription(messages.join('\n') || 'Empty :/')
						.setTitle(d.SpaceShipName)
						.setThumbnail(d.SpaceShipIcon)
						.setColor('RANDOM'),
				] });
			}
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'chat',
	description: 'See your space ship chat!',
	usage: 'wek chat [message]',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};