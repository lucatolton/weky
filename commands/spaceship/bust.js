/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require("../../schemas/rpg");
const replies = ['get ya space costumes!', 'lets gooo!', 'quick quick!', 'be quiet!', 'lets get that win!', 'dont fail!'];
const rreplies = replies[Math.floor(Math.random() * replies.length)];

module.exports.run = async (client, message, args, utils, data) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {

		const query = { SpaceShipID: args[0].replace('#', '') };
		const therQuery = { SpaceShipID: extractedData.stats.inWhatSpaceShip };
		const d = await ssSchema.findOne(query);
		const theirSs = await ssSchema.findOne(therQuery);
		const percentage = Math.round(utils.realPercentage(d.SpaceShipCurrent, d.SpaceShipMax))

		if (!d) return message.reply('I can\'t find this spaceship!');

		const msg = await message.channel.send(
			`Attempting to start a heist in the spaceship **${d.SpaceShipName}**, ${rreplies}\n` +
			`\`Vault\`: ${d.SpaceShipCurrent} ${utils.emojis.aero} (\`${percentage}%\`)\n` +
			'Waiting for copilot to accept...',
			{
				components:
					[
						{
							type: 1, components: [
								{
									type: 2,
									label: 'Yes',
									custom_id: 'yes',
									style: 'green'
								},
								{
									type: 2,
									label: 'No',
									custom_id: 'no',
									style: 'red'
								}
							]
						}]
			})
		// const copilot = await client.users.cache.get(theirSs.SpaceShipCopilot)
		const copilot = message.author;
		const moneyStolen = require('weky').randomizeNumber(d.SpaceShipMax, d.SpaceShipCurrent / 1.4);
		const verification = await utils.createButtonConfirmation(msg, copilot);
		if (verification == true) {
			const success = await utils.createButtonWireMinigame(message, copilot, d)
			if (success == true) {
				message.channel.send(`*silence* GG! You heroes stole \`${moneyStolen}\` ${utils.emojis.aero} of their vault! The money has been deposited in your spaceship!`);
			}
			if (success == false) return message.reply('You guys lost, they caught you :c');
		}
		if (verification == false) return message.channel.send('Copilot denied this action!'); msg.delete();
	})
};

module.exports.help = {
	aliases: [],
	name: 'bust',
	description: 'See your space ship chat!',
	usage: 'wek chat [message]',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'rpg',
	cooldown: 3000,
	disable: false,
};