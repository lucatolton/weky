const ssSchema = require('../../schemas/spaceship');
const rpgSchema = require('../../schemas/rpg');
/* eslint-disable valid-typeof*/

module.exports.run = async (client, message, args, utils) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message);
 
    const query = { SpaceShipID: extractedData.stats.inWhatSpaceShip };
		const theirSs = await ssSchema.findOne(query);
		const percentage = Math.round(utils.realPercentage(theirSs.SpaceShipCurrent, theirSs.SpaceShipMax));
 
    if(!args[0] || isNaN(args[0])) return utils.errorEmbed(message, 'Whoops no aero amount specified, either its not a number!');
		if(!theirSs) return utils.errorEmbed(message, 'What actually happened... your spaceship was erased out of existence?');
		if(theirSs.SpaceShipCurrent < args[0]) return utils.errorEmbed(message, 'Your spaceship does not have that many aero.');
                if(theirSs.SpaceShipCopilot !== message.author.id) return utils.errorEmbed(message, 'This command requires a centrain role in spaceship called **Copilot**.');
 
		message.channel.send({ content: `You withdrawn **${args[0].toLocaleString()}** ${utils.emojis.aero}, your spaceship now has \`${percentage}%\` at vault.` })
    theirSs.SpaceShipMessages.push(`${message.author.id}Withdrawn **${args[0].toLocaleString()}** ${utils.emojis.aero} from vault.`);
    theirSs.SpaceShipCurrent -= args[0];
    await ssSchema.findOneAndUpdate(query, theirSs, { upset: true });
    })
};

module.exports.help = {
	aliases: ['with'],
	name: 'withdraw',
	description: 'WIthdraw some money from your spaceship vault',
	usage: 'wek withdraw [amount]',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'spaceship',
	cooldown: 30000,
	disable: false,
};
