/* eslint-disable valid-typeof*/
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require('../../schemas/rpg');
module.exports.run = async (client, message, args, utils, data) => {
	if (!args[0]) return message.reply({ content: 'Please specify the spaceship id!' });
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		if (extractedData.stats.isInSpaceShip == true) return message.reply({ content: 'You are already in a spaceship!' });
		if(extractedData.stats.hasPendingRequests == true) return utils.errorEmbed(message, 'Seems like you already applied to be pilot in a spaceship...');

		const query = { SpaceShipID: args[0].replace('#', '') };
		const d = await ssSchema.findOne(query);

		if (!d) return message.reply({ content: 'I can\'t find this spaceship!' });

		if (d.SpaceShipPrivate === true) {
			if(d.SpaceShipPendingPilots[message.author.id]) return utils.errorEmbed('You already requested to join here.');
			d.SpaceShipMessages.push(`${message.author.id}**${message.author.id}** requested to join! Use \`wek accept/deny [Tag/Username/Id]\`!`);
			d.SpaceShipPendingPilots[message.author.id] = true;

			await ssSchema.findOneAndUpdate(query, d, { upset: true });

			message.channel.send({ content: 'Successfully **applied** to enter in `' + d.SpaceShipName + '`! Please wait until a co-pilot or the captain accept/decline!' });
		}
		else {

			message.channel.send({ content: 'Successfully entered in `' + d.SpaceShipName + '`! Have fun!' });
			await data.rpg.modifyStats(message.author.id, 'isInSpaceShip', true, '=', message);
			await data.rpg.modifyStats(message.author.id, 'inWhatSpaceShip', args[0].replace('#', ''), '=', message);
			await data.rpg.modifyStats(message.author.id, 'hasPendingRequests', true, '=', message);

			d.SpaceShipPilots[message.author.id] = {};
			d.SpaceShipPilots[message.author.id].joinedAt = Date.now();
			d.SpaceShipPilots[message.author.id].deposited = 0;
			d.SpaceShipMessages.push(`${message.author.id}**${message.author.id}** just joined!`);

			await ssSchema.findOneAndUpdate(query, d, { upset: true });
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'enter',
	description: 'Request/enter a spaceship!',
	usage: 'wek enter <id>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};