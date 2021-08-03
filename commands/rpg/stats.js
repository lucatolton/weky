

const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgdata = require('../../data/rpg-data')
const map = require('../../data/map')
const rpgSchema = require('../../schemas/rpg');
const ssSchema = require('../../schemas/spaceship');

module.exports.run = async (client, message, args, utils, data) => {

	rpgSchema.findOne({ id: message.author.id }, async (err, data) => {
		await ssSchema.findOne({ id: id }).lean().exec().then(async (dataShips) => {
			if (!data || typeof data == null) {
				return data.rpg.addUser(id, message)
			} else {
				let userx = data.rpg.user(message.author.id, message)

				let equipedHero = userx.equipedHero.heroName
				let embed = new Discord.MessageEmbed()
					.setAuthor(message.author.tag, message.author.displayAvatarURL())
					.addField('In-Battle Stats',
						`\`-\` Died **x${data.stats.diedCounter}** times.` +
						`\`-\` Killed **x${data.stats.mobsKilled}** mobs.` +
						`\`-\` Battled **x${data.stats.diedCounter + data.stats.mobsKilled}** times.` +
						`\`-\` Total MN **x${data.stats.totalMn.toLocaleString('en')}**.`, true)
					.addField('General',
						`\`-\` Registred at <t:${Math.round(data.user.registeredAt / 1000)}:R>.` +
						`\`-\` In <t:${dat.stats.isInSpaceShip ? '`' + dat.stats.inWhatSpaceShip + '`' : 'no spaceship'}.` +
						`\`-\` Hero **${rpgdata.hero.find((u) => u.name.includes(equipedHero)).emoji + ' ' + equipedHero}**.` +
						`\`-\` Planet **x${map.find((u) => u.planet.includes(data.stats.planet)).emoji + ' ' + data.stats.planet}**.` +
						`\`-\` Total Planets **x${data.stats.planetsUnlocked.length}**.` +
						`\`-\` Total Heroes **x${data.stats.hero.sort((a) => a.heroUnlocked == true).length}**.`, true)
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