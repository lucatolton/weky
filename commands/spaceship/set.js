/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');

module.exports.run = async (client, message, args, utils, data) => {
	const dataShips = await ssSchema.findOne({ SpaceShipCaptain: message.author.id });

	if (!dataShips) return message.reply({ content: 'You don\'t own any spaceships!' });

	switch (args[0]) {
	case 'icon': {
		const icon = args[1];


		if (!icon) return message.reply('You must provide an url!');

		if (icon.startsWith('https://cdn.discordapp.com') == false) return message.reply({ content: '**Due to security reason Weky will only accept images that __has been uploaded in discord__**!\nExample: `https://cdn.discordapp.com/...`\nHow? : Drop/send your __downloaded__ image in discord and click on it > Open Original or drop it in browser tab!' });
		if (icon.endsWith('.png') == false && icon.endsWith('.jpg') == false && icon.endsWith('.jpeg') == false) return message.reply({ content: '**Due to security reason Weky will only accept images that __has been upploaded in discord__**!\nExample: `https://cdn.discordapp.com/...`\nHow? : Drop/send your __downloaded__ image in discord and click on it > Open Original or drop it in browser tab!' });

		dataShips.SpaceShipIcon = icon;
		dataShips.save();
		message.reply({ content: 'Successfully applied the changes!' });

		break;
	}
	case 'name': {
		const name = args.slice(1).join(' ');
		if (!name || !args[1]) return message.reply({ content: 'You must provide a name!' });

		dataShips.SpaceShipName = name.slice(0, 30).replace(/\n/gi, '').replace(/https:/gi, 'lmfao:').replace(/`/gi, '').replace(/_/gi, '').replace(/\*/gi, '');
		dataShips.save();
		message.reply({ content: 'Successfully applied the changes!' });

		break;
	}
	case 'description': {

		const description = args.slice(1).join(' ');
		if (!description || !args[1]) return message.reply({ content: 'You must provide a description!' });

		dataShips.SpaceShipDescription = description.slice(0, 100).replace(/\n/gi, '').replace(/https:/gi, 'lmfao:').replace(/`/gi, '').replace(/_/gi, '').replace(/\*/gi, '');
		dataShips.save();
		message.reply({ content: 'Successfully applied the changes!' });

		break;
	}
	case 'officer': {

		const officer = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || client.users.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(' ') || x.user.username === args[1]);
		if (!officer) return utils.errorEmbed(message, 'You must provide an officer!');
		if(officer.id === message.author.id) return utils.errorEmbed(message, 'You can\'t have this role!');
		if (dataShips.SpaceShipCoPilot == officer.id) dataShips.SpaceShipCoPilot = null;

		if (!dataShips.SpaceShipPilots[officer.id]) return utils.errorEmbed(message, 'The user is not a pilot in your space ship!');

		dataShips.SpaceShipOfficer = officer.id;
		dataShips.save();
		message.reply({ content: 'Successfully applied the changes!' });

		break;
	}
	case 'copilot': {

		const copilot = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || client.users.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(' ') || x.user.username === args[1]);
		if (!copilot) return utils.errorEmbed(message, 'You must provide an copilot!');
		if(copilot.id === message.author.id) return utils.errorEmbed(message, 'You can\'t have this role!');
		if (dataShips.SpaceShipOfficer == copilot.id) dataShips.SpaceShipOfficer = null;

		if (!dataShips.SpaceShipPilots[copilot.id]) return utils.errorEmbed(message, 'The user is not a pilot in your space ship!');

		dataShips.SpaceShipCoPilot = copilot.id;
		dataShips.save();
		message.reply({ content: 'Successfully applied the changes!' });

		break;
	}
	default: {

		message.reply({ embeds: [new Discord.MessageEmbed().setTitle('Space ship control panel').setDescription('`description`, `name`, `icon`, `officer`, `copilot`')] });

		break;
	}
	}
};

module.exports.help = {
	aliases: [],
	name: 'set',
	description: 'Set your space ship details!',
	usage: 'wek set',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};