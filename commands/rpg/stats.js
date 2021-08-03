

const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgdata = require('../../data/rpg-data')
const map = require('../../data/map')

module.exports.run = async (client, message, args, utils, data) => {
	let userx = data.rpg.user(message.author.id, message)

	console.log(userx)
	let equipedHero = userx.equipedHero.heroName
	let embed = new Discord.MessageEmbed()
		.setAuthor(message.author.tag, message.author.displayAvatarURL())
		.addField('In-Battle Stats',
			`\`-\` Died **x${userx.db.stats.diedCounter}** times.` +
			`\`-\` Killed **x${userx.db.stats.mobsKilled}** mobs.` +
			`\`-\` Battled **x${userx.db.stats.diedCounter + userx.db.stats.mobsKilled}** times.` +
			`\`-\` Total MN **x${userx.db.stats.totalMn.toLocaleString('en')}**.`, true)
		.addField('General',
			`\`-\` Registred at <t:${Math.round(data.user.registeredAt / 1000)}:R>.` +
			`\`-\` Hero **${rpgdata.hero.find((u) => u.name.includes(equipedHero)).emoji + ' ' + equipedHero}**.` +
			`\`-\` Planet **x${map.find((u) => u.planet.includes(userx.db.stats.planet)).emoji + ' ' + userx.db.stats.planet}**.` +
			`\`-\` Total Planets **x${userx.db.stats.planetsUnlocked.length}**.` +
			`\`-\` Total Heroes **x${userx.db.stats.hero.sort((a) => a.heroUnlocked == true).length}**.`, true)
	message.reply(embed)
};
module.exports.help = {
	aliases: ['sv'],
	name: 'sideview',
	description: 'Side view yourself, everything you did in the weky rpg!',
	usage: 'wek sideview',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'rpg',
	cooldown: 3000,
	disable: false,
};