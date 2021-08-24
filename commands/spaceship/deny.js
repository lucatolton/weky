/* eslint-disable valid-typeof*/
const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require('../../schemas/rpg');
module.exports.run = async (client, message, args, utils, data) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const query = { SpaceShipID: extractedData.stats.inWhatSpaceShip };
		const d = await ssSchema.findOne(query);

		if(!d) return utils.errorEmbed(message, 'I can\'t find this spaceship!');
		if(!member) return utils.errorEmbed(message, 'I can\'t find this user :thinking:.');
		if(!d.SpaceShipPendingPilots[member.user.id]) return utils.errorEmbed(message, 'This user did not request to join your spaceship.');
		if(d.SpaceShipCopilot !== message.author.id && d.SpaceShipCaptain !== message.author.id) return utils.errorEmbed(message, 'Only Captain and Copilot can use this!');

		delete d.SpaceShipPendingPilots[member.user.id];
		delete d.SpaceShipPilots[member.user.id];

		d.SpaceShipMessages.push(`${message.author.id}Denied **${member.user.tag}**!`);

		await data.rpg.modifyStats(member.user.id, 'hasPendingRequests', false, '=', message);

		await ssSchema.findOneAndUpdate(query, d, { upset: true });

		message.channel.send({ content: 'Successfully **denied** ' + member.user.tag + ' to enter in `' + d.SpaceShipName + '`!' });

		try {
			member.user.send(`You have been **denied** to join \`${d.SpaceShipName}\` by **${message.author.tag}**!`);
		}
		catch (e) {
			return;
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'deny',
	description: 'Deny the user\'s request to your your spaceship!',
	usage: 'wek deny <id>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 3000,
	disable: false,
};