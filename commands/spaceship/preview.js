/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');

module.exports.run = async (client, message, args, utils, data) => {
	if(!args[0]) return message.reply('Please specify the spaceship id!');

	const d = await ssSchema.findOne({ SpaceShipID: args[0].replace('#', '') });

	if (!d) return message.reply('I can\'t find this spaceship!');

	const canvas = await utils.displaySs(d, client);

	const iconsAttachment = new Discord.MessageAttachment(canvas.toBuffer(), 'icons.png');
	message.reply({ files: [iconsAttachment] });

};

module.exports.help = {
	aliases: [],
	name: 'preview',
	description: 'Preview a specified space ship!',
	usage: 'wek preview <id/name>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};