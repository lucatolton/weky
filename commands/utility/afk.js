
const Discord = require('discord.js');
module.exports.run = async (client, message, args, utils) => {
	const afkreason = args.join(' ') || 'AFK';

	require('../../schemas/userDB').findOneAndUpdate({ id: message.author.id }, { is_afk: true, afkReason: afkreason }, { upset: true })
	message.channel.send(Discord.Util.removeMentions(`You are now afk for: **\`${afkreason}\`**`));
};


module.exports.help = {
	aliases: [],
	name: 'afk',
	description: 'Set afk',
	usage: '..afk %reason%',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'utility',
	disable: false,
	cooldown: 1000
};