const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require('../../schemas/rpg');
const replies = ['get ya space costumes!', 'lets gooo!', 'quick quick!', 'be quiet!', 'lets get that win!', 'dont fail!'];
const rreplies = replies[Math.floor(Math.random() * replies.length)];
/* eslint-disable valid-typeof*/

module.exports.run = async (client, message, args, utils) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		if(!args[0]) return utils.errorEmbed(message, 'Hmm you did not provide a spaceship id...');

		const query = { SpaceShipID: args[0].replace('#', '') };
		const therQuery = { SpaceShipID: extractedData.stats.inWhatSpaceShip };
		const d = await ssSchema.findOne(query);

		if (!d) return message.reply({ content: 'I can\'t find this spaceship!' });
		const theirSs = await ssSchema.findOne(therQuery);
		const percentage = Math.round(utils.realPercentage(d.SpaceShipCurrent, d.SpaceShipMax));

		if(!theirSs) return utils.errorEmbed(message, 'What actually happened... your spaceship was erased out of existence?');
		if (d.SpaceShipID == theirSs.SpaceShipID) return utils.errorEmbed(message, 'You cant bust your own spaceship vault!');
		if(d.SpaceShipCurrent < 500) return utils.errorEmbed(message, 'The spaceship does not have even 500 aero.. not worth so i will do not let you bust it.');

		const msg = await message.channel.send({ content: `Attempting to start a heist in the spaceship **${d.SpaceShipName}**, ${rreplies}\n` +
			`\`Vault\`: ${d.SpaceShipCurrent} ${utils.emojis.aero} (\`${percentage}%\`)\n` +
			'Waiting for copilot to accept...',
		components:
					[
						{
							type: 1, components: [
								{
									type: 2,
									label: 'Yes',
									custom_id: 'yes',
									style: 'SUCCESS',
								},
								{
									type: 2,
									label: 'No',
									custom_id: 'no',
									style: 'DANGER',
								},
							],
						}],
		});
		const copilot = await client.users.cache.get(theirSs.SpaceShipCopilot)

		const moneyStolen = Math.round(Math.floor(Math.random() * d.SpaceShipMax) + d.SpaceShipCurrent / 1.4);
		const verification = await utils.createButtonConfirmation(msg, copilot);
		if (verification == true) {
			const { result, button } = await utils.createButtonWireMinigame(message, copilot, d);

			if (result == true) {
				button.followUp({ content: `*silence* GG! You heroes stole \`${moneyStolen.toLocaleString()}\` ${utils.emojis.aero} of their vault! The money has been deposited in your spaceship!` });
			}
			if (result == false) return button.followUp({ content:'You guys lost, they caught you :c' });
		}
		if (verification == false) return message.channel.send({ content: 'Copilot denied this action!' }); msg.delete();
	});
};

module.exports.help = {
	aliases: [],
	name: 'bust',
	description: 'Let\'s go bust a spaceship vault!',
	usage: 'wek bust [id]',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};
