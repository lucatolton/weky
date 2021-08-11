
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, utils, data) => {
	function clean(text) {
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 0 })
		let rege = new RegExp(client.token, "gi");
		let rege1 = new RegExp(9 + 10, "gi");
		let rege2 = new RegExp(69 + 69, "gi");
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
			.replace(rege, '404')
			.replace(rege1, '21')
			.replace(rege2, '666')
		return text;
	};
	let code = args.join(' ');
	try {

		let evaled = eval('async function ajabalah(){\n' + code + '\n}ajabalah');

		if (typeof evaled !== 'string') {
			evaled = require('util').inspect(evaled);
		}
		if (evaled.length > 2000) {
			let evalcode1 = new MessageEmbed()
				.setDescription(`\`Result\`\n` + `\`\`\`js\nDown\`\`\``)
				.setColor('202020')

				message.channel.send({embed: evalcode1}), fs.writeFile(`eval.txt`, `${clean(evaled)}`, function(err, result) {
					if(err) console.log('error', err);
				  }
				), message.channel.send({ files: ["eval.txt"] });
		}
		let evalcode = new MessageEmbed()
			.setDescription(`\`Result\`\n` + `\`\`\`js\n${clean(evaled)}\`\`\``)
			.setColor('202020')

		message.channel.send({ embed: evalcode })
	} catch (err) {
		let errorcode = new MessageEmbed()
			.setDescription(`\`Result\`\n` + `\`\`\`js\n${clean(err)}\`\`\``)
			.setColor('202020')

		message.channel.send({ embed: errorcode })
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