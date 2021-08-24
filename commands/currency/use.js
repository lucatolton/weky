const rpgSchema = require('../../schemas/rpg');
/*  eslint-disable valid-typeof*/

module.exports.run = async (client, message, args, utils, data) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		if (!args[0]) return utils.errorEmbed(message, 'No power up specified!');
		const wiki = require('../../data/rpg-data').powerups.find((v) => v.aliases.includes(args[0]));

		if (!wiki) return utils.errorEmbed(message, 'The specified power up is invalid!');

		if (extractedData[wiki.name] <= 0) return utils.errorEmbed(message, 'The specified power up is not in your backpack!');

		if (extractedData.powerups.includes(wiki.powerName)) return utils.errorEmbed(message, 'The specified power up is already used!');

		const custom = wiki.emoji + ' **' + wiki.name + '**';

		data.rpg.modify(message.author.id, 'powerups', wiki.powerName, 'push', message);
		data.rpg.modify(message.author.id, wiki.name + 'P', wiki.durability, '=', message);
		data.rpg.modify(message.author.id, wiki.name, 1, '-=', message);

		message.channel.send({ content: `**${message.author.username}** used one ${custom}. The durability of it is \`${wiki.durability}%\`.` });
	});
};
module.exports.help = {
	aliases: [],
	name: 'use',
	description: 'Use an item!',
	usage: 'wek use <powerup>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'currency',
	cooldown: 30000,
	disable: false,
};