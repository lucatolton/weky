module.exports.run = async (client, message, args, utils, data) => {

	let value = Math.floor(Math.random() * 1000) + 3000;

	if (data.user.premium == true) value *= 1.4;

	data.rpg.addAero(message.author.id, Math.round(value), message);
	message.reply({ content:utils.emojis.success + ` | **You** claimed your daily reward of \`${Math.round(value).toLocaleString('en')}\` ${utils.emojis.aero}${data.user.premium ? ' empowered by x**1.4**' : ''}.` });
};
module.exports.help = {
	aliases: [],
	name: 'daily',
	description: 'Get your daily money!',
	usage: 'wek daily',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'currency',
	cooldown: 86400000 / 2,
	disable: false,
};