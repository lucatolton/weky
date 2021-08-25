/*  eslint-disable valid-typeof*/
const rpgSchema = require('../../schemas/rpg');
const rpgData = require('../../data/rpg-data');

module.exports.run = async (client, message) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		let i = 0;
		let str = '';
		rpgData.powerups.forEach((e) => {
			if (extractedData[e.name] > 0) {
				i++;
				str += e.emoji + ' **' + e.name + '** - x' + extractedData[e.name] + '\n';
			}
		});
		if (i == 0) return message.channel.send('Empty :(');

		message.channel.send({ content: str });
	});
};
module.exports.help = {
	aliases: ['bp'],
	name: 'backpack',
	description: 'Displays what you have!',
	usage: 'wek backpack',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'currency',
	cooldown: 3000,
	disable: false,
};
