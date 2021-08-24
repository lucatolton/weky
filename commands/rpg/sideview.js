const Discord = require('discord.js');
const rpgdata = require('../../data/rpg-data');
const map = require('../../data/map');
const rpgSchema = require('../../schemas/rpg');
const ssSchema = require('../../schemas/spaceship');
/*  eslint-disable valid-typeof */

module.exports.run = async (client, message, args, utils, data) => {

	rpgSchema.findOne({ id: message.author.id }, async (err, dat) => {
		const dataShips = await ssSchema.findOne({ SpaceShipID: dat.stats.inWhatSpaceShip });

		if (!dat || typeof dat == null) {
			return dat.rpg.addUser(message.author.id, message);
		}
		else {
			const equipedHero = dat.hero.find((e) => e.heroEquiped === true);
			const staminaPercent = await utils.calculatePercentage(dat.stats.stamina / dat.stats.maxStamina);

			const embed = new Discord.MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL())
				.setColor('RANDOM')
				.addField('In-Battle Stats',
					`\`-\` Died **x${dat.stats.diedCounter}** times.\n` +
					`\`-\` Killed **x${dat.stats.mobsKilled}** mobs.\n` +
					`\`-\` Battled **x${dat.stats.diedCounter + dat.stats.mobsKilled}** times.\n` +
					`\`-\` Total MN **x${dat.stats.totalMn.toLocaleString()}**.\n`, true)
				.addField('Meters', `\`Stamina\`: ${utils.displayProgressBar(staminaPercent)}\n`, true)
				.addField('General',
					`\`-\` Registred <t:${Math.round(data.user.registeredAt / 1000)}:R>.\n` +
					`\`-\` ${dat.stats.isInSpaceShip ? 'In `' + dataShips.SpaceShipName + '` since <t:' + Math.round(dataShips.SpaceShipPilots[message.author.id].joinedAt / 1000) + ':R>.' : 'Not in a spaceship'}.\n` +
					`\`-\` Hero **${rpgdata.hero.find((u) => u.name.includes(equipedHero.heroName)).emoji + ' ' + equipedHero.heroName}**.\n` +
					`\`-\` Planet **${map.find((u) => u.planet.includes(dat.stats.planet)).emoji + ' ' + dat.stats.planet}**.\n` +
					`\`-\` Total Planets **x${dat.stats.planetsUnlocked.length}**.\n` +
					`\`-\` Total Heroes **x${dat.hero.sort((a) => a.heroUnlocked == true).length}**.\n`, true);
			message.reply({ embeds: [embed] });
		}
	});
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