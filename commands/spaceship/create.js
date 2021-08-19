/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const id = require('../../util/utils').randomID(6);

module.exports.run = async (client, message, args, utils, data) => {

	const dataShips = await ssSchema.findOne({ SpaceShipCaptain: message.author.id });

	if (dataShips) return message.reply({ content: 'You are already a Captain in `' + dataShips.SpaceShipName + '`!' });
	await ssSchema.create({ SpaceShipID: id, SpaceShipCaptain: message.author.id }).then(async (d) => {

		await data.rpg.modifyStats(message.author.id, 'isInSpaceShip', true, '=', message);
		await data.rpg.modifyStats(message.author.id, 'inWhatSpaceShip', id, '=', message);
		d.SpaceShipPilots[message.author.id] = {};
		d.SpaceShipPilots[message.author.id].joinedAt = Date.now();
		d.SpaceShipPilots[message.author.id].deposited = 0;

		await ssSchema.findOneAndUpdate({ SpaceShipCaptain: message.author.id }, d, { upset: true });

		message.reply({ content: 'Success! Check it with `wek spaceship` and customize it with `wek set`!' });
	});
};

module.exports.help = {
	aliases: [],
	name: 'create',
	description: 'Create your own space ship!',
	usage: 'wek create',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};