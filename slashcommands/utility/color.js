const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	name: 'color',
	description: 'Search for a color by it\'s hex or your role color!',
	options: [
		{
			type: 'USER',
			description: 'The user',
			name: 'user',
			required: false,
		},
		{
			type: 'STRING',
			description: 'The hex you want to search',
			name: 'hex',
			required: false,
		},
	],

	run: async (client, interaction, args) => {

		const [user] = args;
		const Canvas = require('canvas');
		const axios = require('axios');
		const regex = /(#|0x)([0-9A-F]{6})/i;

		const color = client.guilds.cache.get(interaction.guildId).members.cache.get(user)
			? client.guilds.cache.get(interaction.guildId).members.cache.get(user).displayHexColor
			: null
        ??
        regex.test(user)
				? user.match(regex)[2]
				: null
        ??
        interaction.member.displayHexColor;

		const aa = color.replace('#', '', '0x', '');
		const colour = await axios.get(`https://www.thecolorapi.com/scheme?hex=${aa}`);
		const canvas = Canvas.createCanvas(200, 200);
		const ctx = canvas.getContext('2d');

		ctx.beginPath();
		ctx.rect(0, 0, 200, 200);
		ctx.fillStyle = `${colour.data.seed.hex.value}`;
		ctx.fill();
		const rightpic = new MessageAttachment(canvas.toBuffer(), 'wea.jpg');
		const canvasx = Canvas.createCanvas(500, 100);
		const ctxt = canvasx.getContext('2d');
		const y = canvasx.height / 2;
		ctxt.font = '12px Roboto';
		ctxt.textAlign = 'center';
		let addup = 0;
		for (let i = 0; i < 5; i++) {
			ctxt.beginPath();
			ctxt.rect(addup, 0, 100, 100);
			ctxt.fillStyle = `${colour.data.colors[i].hex.value}`;
			ctxt.fill();
			addup = addup + 100;
			ctxt.beginPath();
			ctxt.rect(addup - 80, y - 15, 60, 30);
			ctxt.fillStyle = 'black';
			ctxt.fill();
			ctxt.fillStyle = 'white';
			ctxt.fillText(`${colour.data.colors[i].hex.value}`, addup - 51, y + 4.3);
		}
		const attachment = new MessageAttachment(canvasx.toBuffer(), 'color.jpg');
		const embed = new MessageEmbed()
			.setColor(`0x${colour.data.seed.hex.value}`)
			.setDescription(`\`HEX: ${colour.data.seed.hex.value} RGB: ${colour.data.seed.rgb.value}\``)
			.setTitle('Color')
			.setURL(`https://www.colorhexa.com/${colour.data.seed.hex.clean}`);

		interaction.followUp({ embeds: [embed], files: [attachment, rightpic] });
	},
};