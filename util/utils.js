const Discord = require('discord.js');

module.exports.prefix = 'wek '


module.exports.shuffleArray = function (array){
	return array.map((value) => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value)
}
module.exports.randomID = (length) => {
	var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var result = '';
	for (var i = 0; i < length; i++) {
		result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
	}
	return result
}

module.exports.errorEmbed = function (message, errorMessage) {
	const errorEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setTitle(this.emojis.error + ' | ' + errorMessage);
	message.channel.send({ embed: errorEmbed });
};


module.exports.emojis = {
	"aero": "<:aeroRPG:859790691579723806>",
	"success": "<:successRPG:859717817607913482>",
	"error": "<:errorRPG:859745856721780777>",
	"share": "<:handshakeRPG:859755019087904768>",
	"timer": "<:timerRPG:859746949863702538>",
	//CONTROL
	"left": "859767100130197544",
	"right": "859767229494853653",
	"stop": "859767846779355147",
	//POWER UPS
	"Poudretteite": "<:PoudretteiteERPG:859763837346381864>",
	"Tanzanite": "<:TanzaniteRPG:859766149339283457>",
	"Benitoite": "<:BenitoiteERPG:860079427261693992>",
	"Grandidierite": "<:GrandidieriteERPG:860079815637467176>",
	"Beryl": "<:BerylERPG:860081785124028457>",
	"Jadeite": "<:JadeiteERPG:860079590344753163>",
	"Opal": "<:OpalERPG:860087012424941578>",
	"Ruby": "",
	"Sapphire": "",
	"Emerald": "",
	"Diamond": "",
	"PoudretteiteID": "859763837346381864",
	"TanzaniteID": "859766149339283457",
	"BenitoiteID": "860079427261693992",
	"GrandidieriteID": "860079815637467176",
	"BerylID": "860081785124028457",
	"JadeiteID": "860079590344753163",
	"OpalID": "860087012424941578",
	"RubyID": "",
	"SapphireID": "",
	"EmeraldID": "",
	"DiamondID": "",
	//Others
	"MoonFragments": "<:moonfragmentsRPG:860089952783433749>",
	//URLS
	"pilots": 'https://cdn.discordapp.com/attachments/798509295712075795/868050840257183754/Untitled457_20210723154340.png',
	"officer": "https://cdn.discordapp.com/attachments/798509295712075795/868052590561218600/Untitled457_20210723154742.png",
	"copilot": "https://cdn.discordapp.com/attachments/798509295712075795/868053246625845278/Untitled457_20210723155325.png",
	"captain": "https://cdn.discordapp.com/attachments/798509295712075795/868054896946065408/Untitled457_20210723160002.png",
	"spaceship": "https://cdn.discordapp.com/attachments/798509295712075795/867752742961545217/Untitled455_20210722195925.png",
}

module.exports.use = async function (id, power, data, message) {


	const wiki = require('../data/rpg-data').powerups.find((v) => v.name.includes(power))

	let custom = wiki.emoji + ' **' + wiki.name + '**'

	data.modify(id, 'powerups', wiki.powerName, 'push', message)
	data.modify(id, wiki.name + 'P', wiki.durability, '=', message)
	data.modify(id, wiki.name, 1, '-=', message)
	return { custom, wiki }
}
module.exports.createButtonPagination = async function (array, message) {
	const dis = require('discord-buttons')

	function getRandomString(length) {
		var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		var result = '';
		for (var i = 0; i < length; i++) {
			result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
		}
		return result
	}
	let id1 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
	id2 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
	id3 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))

	let btn2;

	let btn1 = new dis.MessageButton().setLabel('\u200b').setEmoji(this.emojis.left).setStyle('gray').setID(id1).setDisabled()

	if (array.length === 1) { btn2 = new dis.MessageButton().setLabel('\u200b').setEmoji(this.emojis.right).setStyle('gray').setID(id2).setDisabled() } else
		btn2 = new dis.MessageButton().setLabel('\u200b').setEmoji(this.emojis.right).setStyle('gray').setID(id2)

	let btn3 = new dis.MessageButton().setLabel('\u200b').setEmoji(this.emojis.stop).setStyle('blurple').setID(id3)

	let row = new dis.MessageActionRow()
		.addComponent(btn1)
		.addComponent(btn2)
		.addComponent(btn3)
	let i = 0;
	let DaBaby = await message.channel.send(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })
	const gameFilter = m => m.clicker.user.id === message.author.id;
	const gameCollector = DaBaby.createButtonCollector(gameFilter);

	gameCollector.on('collect', btn => {
		btn.reply.defer()
		if (btn.id === id1) {
			if (i === 1) {
				btn1 = new dis.MessageButton().setLabel('\u200b').setEmoji(this.emojis.left).setStyle('gray').setID(id1).setDisabled()

				DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })
			}
			btn2 = new dis.MessageButton().setLabel('\u200b').setEmoji(this.emojis.right).setStyle('gray').setID(id2)
			row = new dis.MessageActionRow()
				.addComponent(btn1)
				.addComponent(btn2)
				.addComponent(btn3)
			i--;
			DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })
		} else if (btn.id === id2) {
			if (i === array.length - 2) {
				btn2 = new dis.MessageButton().setLabel('\u200b').setEmoji(this.emojis.right).setStyle('gray').setID(id2).setDisabled()

				DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })
			}
			btn1 = new dis.MessageButton().setLabel('\u200b').setEmoji(this.emojis.left).setStyle('gray').setID(id1)
			i++;
			row = new dis.MessageActionRow()
				.addComponent(btn1)
				.addComponent(btn2)
				.addComponent(btn3)
			DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })

		} else if (btn.id === id3) {
			DaBaby.delete()
			gameCollector.stop()
		}
	})
}
module.exports.calculatePercentage = async function (num, perc) {
	return (num * perc) / 100
}
