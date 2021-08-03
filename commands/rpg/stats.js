

const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgdata = require('../../data/rpg-data')
const map = require('../../data/map')
const rpgSchema = require('../../schemas/rpg');
const ssSchema = require('../../schemas/spaceship');

module.exports.run = async (client, message, args, utils, data) => {

	rpgSchema.findOne({ id: message.author.id }, async (err, dat) => {
		await ssSchema.findOne({ id: message.author.id }).lean().exec().then(async (dataShips) => {
			if (!dat || typeof dat == null) {
				return dat.rpg.addUser(message.author.id, message)
			} else {
				let equipedHero = dat.hero.find((e) => e.heroEquiped === true)
	let embed = new Discord.MessageEmbed()
					.setAuthor(message.author.tag, message.author.displayAvatarURL())
					.addField('In-Battle Stats',
						`\`-\` Died **x${dat.stats.diedCounter}** times.\n` +
						`\`-\` Killed **x${dat.stats.mobsKilled}** mobs.\n` +
						`\`-\` Battled **x${dat.stats.diedCounter + dat.stats.mobsKilled}** times.\n` +
						`\`-\` Total MN **x${dat.stats.totalMn.toLocaleString('en')}**.\n`, true)
					.addField('General',
						`\`-\` Registred at <t:${Math.round(data.user.registeredAt / 1000)}:R>.\n` +
						`\`-\` In <t:${dat.stats.isInSpaceShip ? '`' + dat.stats.inWhatSpaceShip + '`' : 'no spaceship'}.\n` +
						`\`-\` Hero **${rpgdata.hero.find((u) => u.name.includes(equipedHero.heroName)).emoji + ' ' + equipedHero.heroName}**.\n` +
						`\`-\` Planet **x${map.find((u) => u.planet.includes(dat.stats.planet)).emoji + ' ' + dat.stats.planet}**.\n` +
						`\`-\` Total Planets **x${dat.stats.planetsUnlocked.length}**.\n` +
						`\`-\` Total Heroes **x${dat.hero.sort((a) => a.heroUnlocked == true).length}**.\n`, true)
				message.reply(embed)
			}
		})
	})
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