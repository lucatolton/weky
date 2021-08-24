const rpgSchema = require('../../schemas/rpg');
/*  eslint-disable valid-typeof*/

module.exports.run = async (client, message, args, utils, data) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		if (!args[0]) return utils.errorEmbed(message, 'No power up specified!');
		const wiki = require('../../data/rpg-data').powerups.find((v) => v.aliases.includes(args[0]));

		if (!wiki) return utils.errorEmbed(message, 'The specified power up is invalid!');

		const custom = wiki.emoji + ' **' + wiki.name + '**';
		const amount = !isNaN(args[1]) ? Math.round(parseInt(args[1])) : 1;
		const wastedMoney = Math.round(amount * wiki.cost);

		if(extractedData.aero < wastedMoney) return utils.errorEmbed(message, 'You dont have enough money!');
		if(amount <= 0) return utils.errorEmbed(message);
		data.rpg.modify(message.author.id, wiki.name, amount, '+=', message);
		data.rpg.modify(message.author.id, wiki.aero, wastedMoney, '-=', message);

		message.channel.send({ content: `**${message.author.username}** bought ${amount} ${custom} with ${wastedMoney} ${utils.emojis.aero}` });
	});
};
module.exports.help = {
	aliases: ['purchase'],
	name: 'buy',
	description: 'Buy something from shop!',
	usage: 'wek buy <powerup> <amount>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'currency',
	cooldown: 6000,
	disable: false,
};