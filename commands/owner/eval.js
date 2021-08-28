const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	function clean(text) {
		if (typeof text !== 'string') {text = require('util').inspect(text, { depth: 0 });}
		const rege = new RegExp(client.token, 'gi');
		const rege1 = new RegExp(9 + 10, 'gi');
		const rege2 = new RegExp(69 + 69, 'gi');
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
			.replace(rege, '404')
			.replace(rege1, '21')
			.replace(rege2, '666');
		return text;
	}
	const code = args.join(' ');
	try {

		let evaled = eval(code);

		if (typeof evaled !== 'string') {
			evaled = require('util').inspect(evaled);
		}

		if (evaled.length > 2000) {
			const evalcode1 = new MessageEmbed()
				.setDescription('`Result`\n' + '```js\nDown```')
				.setColor('202020');

			message.channel.send({ embeds: [evalcode1] }), fs.writeFile('eval.txt', `${clean(evaled)}`, function(err) {
				if (err) console.log('error', err);
			},
			), message.channel.send({ files: ['eval.txt'] });
		} else {
		const evalcode = new MessageEmbed()
			.setDescription('`Result`\n' + `\`\`\`js\n${clean(evaled)}\`\`\``)
			.setColor('202020');

		message.channel.send({ embeds: [evalcode] });
		}
	}
	catch (err) {
		const errorcode = new MessageEmbed()
			.setDescription('`Result`\n' + `\`\`\`js\n${clean(err)}\`\`\``)
			.setColor('202020');

		message.channel.send({ embeds: [errorcode] });
	}
};

module.exports.help = {
	aliases: [],
	name: 'eval',
	description: 'eval cmd xd',
	usage: 'eval',
};

module.exports.config = {
	restricted: true,
	args: true,
	category: 'owner',
	disable: false,
	cooldown: 0,
};
