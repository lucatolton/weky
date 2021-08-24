/* eslint-disable valid-typeof*/
const { MessageAttachment } = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require('../../schemas/rpg');

module.exports.run = async (client, message, args, utils) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		if (extractedData.stats.isInSpaceShip == false) return message.reply({ content: 'You are not in any spaceships!' });
		const d = await ssSchema.findOne({ SpaceShipID: extractedData.stats.inWhatSpaceShip });

		if (!d) return message.reply('You are not in any spaceships either i can\'t find it!');

		const canvas = await utils.displaySs(d, client);

		const iconsAttachment = new MessageAttachment(canvas.toBuffer(), 'icons.png');
		message.reply({ files: [iconsAttachment] });
	});
};

module.exports.help = {
	aliases: ['ss'],
	name: 'spaceship',
	description: 'See your space ship!',
	usage: 'wek spaceship',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};