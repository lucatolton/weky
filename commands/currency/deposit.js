const rpgSchema = require('../../schemas/rpg');
const ssSchema = require('../../schemas/spaceship');
/*  eslint-disable valid-typeof*/
module.exports.run = async (client, message, args, utils, data) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		await ssSchema.findOne({ SpaceShipID: extractedData.stats.inWhatSpaceShip }, async (err, ssData) => {
			if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);
			const amount = Math.round(parseInt(args[0]));

			if (!args[0] || isNaN(parseInt(args[0])) || parseInt(args[0]) < 100) return utils.errorEmbed(message, 'No aero amount specified!');

			if (extractedData.aero < parseInt(args[0])) return utils.errorEmbed(message, 'Sorry! You specified more aero than you have!');
			if (ssData.SpaceShipCurrent + amount > ssData.SpaceShipMax) return utils.errorEmbed(message, 'Your space ship vault reached the limit!');
			data.rpg.modify(message.author.id, 'aero', Math.round(parseInt(args[0]), message), '-=');

			ssData.SpaceShipCurrent += amount;
			ssData.SpaceShipPilots[message.author.id].deposited += amount;

			await ssSchema.findOneAndUpdate({ SpaceShipID: extractedData.stats.inWhatSpaceShip }, ssData, { upset: true });

			const percentageBetweenVault = utils.realPercentage(ssData.SpaceShipCurrent, ssData.SpaceShipMax);

			message.reply({ content: utils.emojis.share + ` | **${message.author.username}** deposited \`${amount.toLocaleString('en') + ' (' + Math.round(percentageBetweenVault) + '%)` ' + utils.emojis.aero} to **${ssData.SpaceShipName + '#' + ssData.SpaceShipID}**.` });
		});
	});
};
module.exports.help = {
	aliases: ['dep'],
	name: 'deposit',
	description: 'Deposit aero in your space ship vault!',
	usage: 'wek deposit <amount>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'currency',
	cooldown: 10000,
	disable: false,
};