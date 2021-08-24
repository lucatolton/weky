const Discord = require('discord.js');
const rpgSchema = require('../schemas/rpg');

module.exports.prefix = 'wek ';

module.exports.shuffleArray = function(array) {
	return array.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
};
module.exports.randomID = (length) => {
	const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
	}
	return result;
};

module.exports.errorEmbed = function(message, errorMessage) {
	const errorEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setTitle(this.emojis.error + ' | ' + errorMessage);
	message.channel.send({ embeds: [errorEmbed] });
};


module.exports.emojis = {
	'aero': '<:aeroRPG:859790691579723806>',
	'success': '<:successRPG:859717817607913482>',
	'error': '<:errorRPG:859745856721780777>',
	'share': '<:handshakeRPG:859755019087904768>',
	'timer': '<:timerRPG:859746949863702538>',
	// CONTROL
	'left': '859767100130197544',
	'right': '859767229494853653',
	'stop': '859767846779355147',
	// POWER UPS
	'Poudretteite': '<:PoudretteiteERPG:859763837346381864>',
	'Tanzanite': '<:TanzaniteRPG:859766149339283457>',
	'Benitoite': '<:BenitoiteERPG:860079427261693992>',
	'Grandidierite': '<:GrandidieriteERPG:860079815637467176>',
	'Beryl': '<:BerylERPG:860081785124028457>',
	'Jadeite': '<:JadeiteERPG:860079590344753163>',
	'Opal': '<:OpalERPG:860087012424941578>',
	'Ruby': '',
	'Sapphire': '',
	'Emerald': '',
	'Diamond': '',
	//
	// 	859763837346381864
	// 859766149339283457
	// 860079590344753163
	'PoudretteiteID': '859763837346381864',
	'TanzaniteID': '859766149339283457',
	'BenitoiteID': '860079427261693992',
	'GrandidieriteID': '860079815637467176',
	'BerylID': '860081785124028457',
	'JadeiteID': '860079590344753163',
	'OpalID': '860087012424941578',
	'RubyID': '',
	'SapphireID': '',
	'EmeraldID': '',
	'DiamondID': '',
	// Others
	'MoonFragments': '<:moonfragmentsRPG:860089952783433749>',
	// URLS
	'pilots': 'https://cdn.discordapp.com/attachments/798509295712075795/868050840257183754/Untitled457_20210723154340.png',
	'officer': 'https://cdn.discordapp.com/attachments/798509295712075795/868052590561218600/Untitled457_20210723154742.png',
	'copilot': 'https://cdn.discordapp.com/attachments/798509295712075795/868053246625845278/Untitled457_20210723155325.png',
	'captain': 'https://cdn.discordapp.com/attachments/798509295712075795/868054896946065408/Untitled457_20210723160002.png',
	'spaceship': 'https://cdn.discordapp.com/attachments/798509295712075795/867752742961545217/Untitled455_20210722195925.png',
	'aeroURL' : 'https://cdn.discordapp.com/attachments/798509295712075795/859712317960224778/Untitled384_20210630152845.png',
};

module.exports.displaySs = async function(d, client) {
	const total = d.SpaceShipCurrent;
	const needMore = d.SpaceShipMax;

	const { createCanvas, registerFont } = require('canvas');
	const Canvas = require('canvas');

	const canvas = createCanvas(1920, 1080);
	const ctx = canvas.getContext('2d');

	const icon = await Canvas.loadImage(d.SpaceShipIcon);

	const x = 85;
	const y = 300;
	const z = 288;
	const number = 190;

	registerFont('cute.ttf', { family: 'Cute' });

	// background
	ctx.fillStyle = '#1f1e1e';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// space ship
	ctx.drawImage(await Canvas.loadImage(this.emojis.spaceship), 10, -50, 520, 520);

	// name
	ctx.fillStyle = 'white';
	ctx.textAlign = 'start';
	ctx.font = '120px "Cute"';
	ctx.fillText(d.SpaceShipName.slice(0, 20), 750, 100);

	// Description
	ctx.fillStyle = '#8b8b8b';
	ctx.textAlign = 'start';
	ctx.font = '30px "Cute"';
	ctx.fillText(d.SpaceShipDescription.slice(0, 200), 750, 150);

	// progress bar [VAULT]
	ctx.fillStyle = 'white';
	ctx.textAlign = 'left';
	ctx.fillRect(x, z - 3 + number, 325, 30);

	ctx.beginPath();
	ctx.arc(x, y + number, 15, 0.5 * Math.PI, 1.5 * Math.PI, false);
	ctx.fill();
	ctx.arc(x + 325, y + number, 15, 0.5 * Math.PI, 1.5 * Math.PI, true);
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = '#242424';
	ctx.arc(x, y + number, 12, 0.5 * Math.PI, 1.5 * Math.PI, false);
	ctx.fill();
	ctx.arc(x + 325, y + number, 12, 0.5 * Math.PI, 1.5 * Math.PI, true);
	ctx.fill();
	ctx.fillRect(85, z + number, 325, 24);

	ctx.closePath();


	ctx.beginPath();
	ctx.fillStyle = 'blue';

	ctx.arc(x, y + number, 12, 0.5 * Math.PI, 1.5 * Math.PI, false);
	ctx.fill();
	ctx.fillRect(x, z + number, ((total / needMore) * 325), 24);
	ctx.arc(x + ((total / needMore) * 325), y + number, 12, 0.5 * Math.PI, 1.5 * Math.PI, true);
	ctx.fill();

	ctx.closePath();

	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.font = '40px "Cute"';
	ctx.fillText('Vault', x + 162.5, 287 + number);

	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.font = '20px "Cute"';
	ctx.fillText(`${Math.round(this.realPercentage(total, needMore))}%`, x + 162.5, 307.5 + number);

	// line
	ctx.beginPath();
	ctx.rect(0, 520, 1970, 10);
	ctx.fillStyle = '#ff000';
	ctx.fill();
	ctx.stroke();

	// Roles
	ctx.beginPath();
	ctx.drawImage(await Canvas.loadImage(this.emojis.pilots), 1200, 920, 180, 180);
	ctx.drawImage(await Canvas.loadImage(this.emojis.officer), 1200, 790, 180, 180);
	ctx.drawImage(await Canvas.loadImage(this.emojis.copilot), 1200, 650, 180, 180);
	ctx.drawImage(await Canvas.loadImage(this.emojis.captain), 1200, 510, 180, 180);
	ctx.drawImage(await Canvas.loadImage(this.emojis.aeroURL), -7, 532, 175, 175);
	ctx.font = '45px "Cute"';
	ctx.textAlign = 'start';
	ctx.fillText(': ' + Object.keys(d.SpaceShipPilots).length, 1420, 1070);
	ctx.font = '65px "Cute"';
	ctx.fillText(': ' + d.SpaceShipCurrent.toLocaleString(), 190, 640);
	ctx.font = '45px "Cute"';
	ctx.textAlign = 'start';
	ctx.fillText(d.SpaceShipOfficer ? ': ' + client.users.cache.get(d.SpaceShipOfficer).username : ': none', 1420, 940);
	ctx.fillText(d.SpaceShipCoPilot ? ': ' + client.users.cache.get(d.SpaceShipCoPilot).username : ': none', 1420, 800);
	ctx.fillText(': ' + client.users.cache.get(d.SpaceShipCaptain).username, 1420, 670);
	ctx.stroke();

	// icon
	ctx.beginPath();
	ctx.arc(275, 219, 80, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.fill();
	ctx.clip();


	ctx.drawImage(icon, 180, 110, 190, 190);

	return canvas;
};

module.exports.use = async function(id, power, data, message) {


	const wiki = require('../data/rpg-data').powerups.find((v) => v.name.includes(power));

	const custom = wiki.emoji + ' **' + wiki.name + '**';

	data.modify(id, 'powerups', wiki.powerName, 'push', message);
	data.modify(id, wiki.name + 'P', wiki.durability, '=', message);
	data.modify(id, wiki.name, 1, '-=', message);
	await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true });
	return { custom, wiki };
};
module.exports.createButtonPagination = async function(array, message) {

	function getRandomString(length) {
		const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
		}
		return result;
	}
	const id1 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4));
	const id2 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4));
	const id3 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4));

	let btn2;

	let btn1 = new Discord.MessageButton().setLabel('\u200b').setEmoji(this.emojis.left).setStyle('SECONDARY').setCustomId(id1).setDisabled();

	if (array.length === 1) { btn2 = new Discord.MessageButton().setLabel('\u200b').setEmoji(this.emojis.right).setStyle('SECONDARY').setCustomId(id2).setDisabled(); }
	else {btn2 = new Discord.MessageButton().setLabel('\u200b').setEmoji(this.emojis.right).setStyle('SECONDARY').setCustomId(id2);}

	const btn3 = new Discord.MessageButton().setLabel('\u200b').setEmoji(this.emojis.stop).setStyle('PRIMARY').setCustomId(id3);

	let row = new Discord.MessageActionRow()
		.addComponents([btn1, btn2, btn3]);
	let i = 0;
	const DaBaby = await message.channel.send({ content: `Page ${i + 1} / ${array.length}`, embeds: [array[i]], components: [row] });
	const gameFilter = m => m.clicker.user.id === message.author.id;
	const gameCollector = DaBaby.createMessageComponentCollector({ gameFilter, componentType: 'BUTTON', time: 50000 });

	gameCollector.on('collect', btn => {
		if (btn.customId === id1) {
			if (i === 1) {
				btn1 = new Discord.MessageButton().setLabel('\u200b').setEmoji(this.emojis.left).setStyle('SECONDARY').setCustomId(id1).setDisabled();

				DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embeds: [array[i]], component: row });
			}
			btn2 = new Discord.MessageButton().setLabel('\u200b').setEmoji(this.emojis.right).setStyle('SECONDARY').setCustomId(id2);
			row = new Discord.MessageActionRow()
				.addComponent(btn1)
				.addComponent(btn2)
				.addComponent(btn3);
			i--;
			DaBaby.edit({ content: `Page ${i + 1} / ${array.length}`, embeds: [array[i]], components: [row] });
		}
		else if (btn.customId === id2) {
			if (i === array.length - 2) {
				btn2 = new Discord.MessageButton().setLabel('\u200b').setEmoji(this.emojis.right).setStyle('SECONDARY').setCustomId(id2).setDisabled();

				DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embeds: [array[i]], component: row });
			}
			btn1 = new Discord.MessageButton().setLabel('\u200b').setEmoji(this.emojis.left).setStyle('SECONDARY').setCustomId(id1);
			i++;
			row = new Discord.MessageActionRow()
				.addComponent(btn1)
				.addComponent(btn2)
				.addComponent(btn3);
			DaBaby.edit({ content: `Page ${i + 1} / ${array.length}`, embeds: [array[i]], components: [row] });

		}
		else if (btn.customId === id3) {
			DaBaby.delete();
			gameCollector.stop();
		}
	});
};
module.exports.calculatePercentage = function(num, perc) {
	return (num * perc) / 100;
};

module.exports.randomizeNumber = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
module.exports.createButtonConfirmation = async function(emessage, user, { time = 30000 } = {}) {
	const filter = button => {
		return (user ? button.user.id === user.id : true);
	};
	let result = false;

	const interaction = await emessage.awaitMessageComponent({ filter, componentType: 'BUTTON', time: time });

	interaction.deferUpdate();

	if (interaction.customId == 'yes') return result = true;
	if (interaction.customId == 'no') return result = false;

	return { result, interaction };


};

module.exports.createButtonWireMinigame = async function(message, user, d, { time = 40000 } = {}) {
	const btn1 = new Discord.MessageButton().setStyle('DANGER').setEmoji('875083412032061491').setCustomId('wire1');
	const btn2 = new Discord.MessageButton().setStyle('SUCCESS').setEmoji('875083788307284018').setCustomId('wire2');
	const btn3 = new Discord.MessageButton().setStyle('PRIMARY').setEmoji('875083866153554000').setCustomId('wire3');

	const msg2 = await message.channel.send(
		{
			content: `**${message.author.username}** and **${user.username}** infiltrated into the spaceship **${d.SpaceShipName}** but an alert started, <@${user.id}> quickly cut the correct wire!`,
			components: [{
				type: 1,
				components: [btn1, btn2, btn3],
			}],
		});

	const filter = button => {
		return (user ? button.user.id === user.id : true);
	};
	let result = false;

	const button = await msg2.awaitMessageComponent({ filter, componentType: 'BUTTON', time: time });

	button.deferReply({ ephemeral: false });

	const options = ['wire1', 'wire2', 'wire3'];
	const roptions = options[Math.floor(Math.random() * options.length)];

	if (button.customId == roptions) {
		btn1.setStyle('SECONDARY').setDisabled(true);
		btn2.setStyle('SECONDARY').setDisabled(true);
		btn3.setStyle('SECONDARY').setDisabled(true);

		if (button.customId == 'wire1') btn1.setStyle('SUCCESS').setDisabled(true);
		if (button.customId == 'wire2') btn2.setStyle('SUCCESS').setDisabled(true);
		if (button.customId == 'wire3') btn3.setStyle('SUCCESS').setDisabled(true);

		msg2.edit(

			{
				content: `**${message.author.username}** and **${user.username}** infiltrated into the spaceship ` +
				`**${d.SpaceShipName}** but an alert started, <@${user.id}> quickly cut the correct wire!`,
				components: [{
					type: 1,
					components: [btn1, btn2, btn3],
				}],
			});
		result = true;
	}
	if (button.customId !== roptions) {
		btn1.setStyle('SECONDARY').setDisabled(true);
		btn2.setStyle('SECONDARY').setDisabled(true);
		btn3.setStyle('SECONDARY').setDisabled(true);

		if (roptions == 'wire1') btn1.setStyle('SUCCESS').setDisabled(true);
		if (roptions == 'wire2') btn2.setStyle('SUCCESS').setDisabled(true);
		if (roptions == 'wire3') btn3.setStyle('SUCCESS').setDisabled(true);

		if (button.customId == 'wire1') btn1.setStyle('DANGER').setDisabled(true);
		if (button.customId == 'wire2') btn2.setStyle('DANGER').setDisabled(true);
		if (button.customId == 'wire3') btn3.setStyle('DANGER').setDisabled(true);

		msg2.edit(

			{
				content: `**${message.author.username}** and **${user.username}** infiltrated into the spaceship ` +
				`**${d.SpaceShipName}** but an alert started, <@${user.id}> quickly cut the correct wire!`,
				components: [{
					type: 1,
					components: [btn1, btn2, btn3],
				}],
			});

		result = false;
	}
	return { result, button };
};
module.exports.realPercentage = function(min, max) {
	return (min / max) * 100;
};
module.exports.displayProgressBar = function(progress) {
	if (progress < 10) { return '<:bar1Empty:872078474708414464><:bar2Empty:872078539652993054><:bar3Empty:872078570485350481>'; }
	else if (progress < 20) { return '<:bar1Half:872080754513944587><:bar2Empty:872078539652993054><:bar3Empty:872078570485350481>'; }
	else if (progress < 40) { return '<:bar1Full1:872080754220367912><:bar2Empty:872078539652993054><:bar3Empty:872078570485350481>'; }
	else if (progress < 60) { return '<:bar1Full1:872080754220367912><:bar2Half1:872080714890358796><:bar3Empty:872078570485350481>'; }
	else if (progress < 80) { return '<:bar1Full1:872080754220367912><:bar2Full:872080715389485067><:bar3Empty:872078570485350481> '; }
	else if (progress < 90) { return '<:bar1Full1:872080754220367912><:bar2Full:872080715389485067><:bar3Half:872080668237111296>'; }
	else { return '<:bar1Full1:872080754220367912><:bar2Full:872080715389485067><:bar3Full1:872080653594808320>'; }
};