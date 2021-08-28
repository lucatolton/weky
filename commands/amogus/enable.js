const config = require('../../util/config.json');

module.exports.run = async (client, message, args) => {
	const schema = require('../../schemas/Guild');

	if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the `MANAGE CHANNELS` permission.');

	await schema.findOne({ id: message.guild.id }, async (err, dat) => {
		if (['true', 'yes', 'yep', 'ye'].includes(args[0])) {
			dat.amogus.enabled = true;
			await schema.findOneAndUpdate({ id: message.guild.id }, dat, { upset: true });
			message.channel.send('Success!');
		}
		else if (['false', 'folse', 'penis', 'no'].includes(args[0])) {
			dat.amogus.enabled = false;
			await schema.findOneAndUpdate({ id: message.guild.id }, dat, { upset: true });
			message.channel.send('Success!');
		}
		else {
			message.channel.send('Use: `wek enable true/false`');
		}
	});
};

module.exports.help = {
	aliases: [],
	name: 'enable',
	description: 'Enabled amogoos.',
	usage: config.prefix + 'wek enable true/false',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'amogus',
	disable: false,
	cooldown: 1000,
};