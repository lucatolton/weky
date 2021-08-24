/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const id = require('../../util/utils').randomID(6);

module.exports.run = async (client, message, args, utils, data) => {

	await ssSchema.find().limit(10).exec(function(err, result) {
		const random = function(max) { return Math.floor(Math.random() * (max + 1)); };

		function shuffle(a) {
			const length = a.length,
				shuffled = Array(length);
			for (let i = 0, rand; i < length; ++i) {
				rand = random(i);
				if (rand !== i) shuffled[i] = shuffled[rand];
				shuffled[rand] = a[i];
			}
			return shuffled;
		}

		let str = '';
		let i = 0;
		shuffle(result).forEach((e) => {
			i++;
			str += `\`#${i}\` **` + e.SpaceShipName + '**#' + e.SpaceShipID + '\n';
		});

		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setTitle('Random space ships')
					.setDescription(str)
					.setColor('RANDOM'),
			],
		});
	});
};

module.exports.help = {
	aliases: ['exp'],
	name: 'explore',
	description: 'Explore space ships!',
	usage: 'wek explore',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};