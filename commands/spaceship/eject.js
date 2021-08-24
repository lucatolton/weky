/* eslint-disable valid-typeof*/
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require('../../schemas/rpg');

module.exports.run = async (client, message) => {

	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		const query = { SpaceShipID: extractedData.stats.inWhatSpaceShip };
		const d = await ssSchema.findOne(query);


		extractedData.stats.isInSpaceShip = false;
		extractedData.stats.inWhatSpaceShip = null;

		await rpgSchema.findOneAndUpdate({ id: message.author.id }, extractedData, { upset: true });
		if(!d) return;
		d.SpaceShipMessages.push(`${client.user.id}**${message.author.tag}** left.`);
		delete d.SpaceShipPilots[message.author.id];
		await ssSchema.findOneAndUpdate({ id: message.author.id }, d, { upset: true });
	});
	message.reply({ content: 'Successfully ejected!' });
};

module.exports.help = {
	aliases: [],
	name: 'eject',
	description: 'Eject from your current space ship!',
	usage: 'wek eject',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};