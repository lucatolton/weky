


const Discord = require('discord.js');
const rpgSchema = require('../../schemas/rpg')

module.exports.run = async (client, message, args, utils, data) => {
	const items = require("../../data/rpg-data")
	let xp = Math.floor(Math.random() * 6) + 1
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
		if (data.user.premium == true) xp = Math.floor(Math.random() * 10) + 1
		const equipedHero = extractedData.hero.find((e) => e.heroEquiped === true)

		if (extractedData.aero < 50) return utils.errorEmbed(message, 'Battle costs 50 aero.')

		data.rpg.modify(message.author.id, 'aero', 50, '-=', message)

		if (extractedData.powerups.includes('Loot Domination I')) {
			xp *= await utils.calculatePercentage(xp, 10);
			data.rpg.modify(message.author.id, 'TanzaniteP', require('weky').randomizeNumber(50, 10), '-=', message)
		}

		const Discord = require('discord.js')
		const { registerFont, createCanvas } = require('canvas')
		const Canvas = require('canvas')
		const Hero = items.hero.find((val) => val.name.includes(equipedHero.heroName));
		const mobFinder = require('../../data/map').find((val) => val.planet === member.stats.planet)
		const Mob = mobFinder.mobs[Math.floor(Math.random() * mobFinder.mobs.length)]
		const where = 'pixelated.ttf'
		registerFont(where, { family: 'Comic Sans' })
		const canvas = createCanvas(500, 281)
		const ctx = canvas.getContext('2d')
		const background2 = await Canvas.loadImage(mobFinder.background);
		const hero = await Canvas.loadImage(Hero.URL)
		let gameData = [
			{
				member: Mob.name,
				health: Mob.health,
				damage: Mob.damage,
			},
			{
				member: equipedHero.heroName,
				health: equipedHero.heroHp,
				damage: equipedHero.heroDmg,
			},
		];
		const mob = await Canvas.loadImage(Mob.URL)
		ctx.drawImage(background2, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(hero, -10, 40, 250, 250);
		ctx.drawImage(mob, 250, 80, 250, 250);
		ctx.font = '30px "Comic Sans"'
		ctx.fillStyle = 'red'
		ctx.fillText(gameData[1].health, 104, 25)  // HP HERO
		ctx.fillText(gameData[0].health, 350, 25)  // HP MOB
		ctx.font = '20px "Comic Sans"'
		ctx.fillStyle = '#0091FF'
		ctx.fillText(gameData[0].damage, 440, 25) // DMG MOB
		ctx.fillText(gameData[1].damage, 29, 25) // DMG HERO
		ctx.font = '30px "Comic Sans"'
		ctx.fillStyle = 'green'
		ctx.fillText(gameData[1].member, 8, 55)
		ctx.fillText(gameData[0].member, 369, 63)
		let imageLink, color, winorlose

		imageLink = new Discord.MessageAttachment(canvas.toBuffer(), 'pog.png')
		let embedBattle = new Discord.MessageEmbed()
			.setFooter(message.author.tag + '\'s battle')
			.addField(gameData[1].member, '<:TY:845324588887703552><:PE:845324642993307718> `' + Hero.typeOf + '`\n<:DM:845319973915459604><:DM:845320037875056712> `' + gameData[1].damage + '`\n<:HP:845326275035529287><:HP:845326308417601566> `' + gameData[1].health + '`', true)
			.addField('_ _', '**' + extractedData.stats.planet + '**', true)
			.addField(gameData[0].member, '<:LO:845326936636915716><:OT:845326999403757619> `' + Mob.chanceForThings + '%`\n<:DM:845319973915459604><:DM:845320037875056712> `' + gameData[0].damage + '`\n<:HP:845326275035529287><:HP:845326308417601566> ' + `\`${gameData[0].health}\``, true)
			.attachFiles(imageLink)
			.setImage('attachment://pog.png');
		let str = '\u200b';
		extractedData.powerups.forEach((p) => {
			const wiki = require('../../data/rpg-data').powerups.find((v) => v.powerName.includes(p))
			str += '| ' + wiki.emoji + '`[' + extractedData[wiki.name + 'P'] + '%]` | '
		})
		message.reply(str, { embed: embedBattle }).then((edity) => {

			let player = 0
			const checkHealth = (member) => {
				if (gameData[member].health <= 0) return true;
				else return false;
			};
			let bruh = true
			if (!checkHealth(player)) {
				async function fight() {
					while (bruh === true) {

						const chanceFor = Math.floor(Math.random() * 100)
						const chanceFor2 = Math.floor(Math.random() * 100)
						const tempPlayer = (player + 1) % 2;
						let randNumb = Math.floor(Math.random() * gameData[Math.abs(tempPlayer - 1)].damage)

						if (chanceFor <= 5) {
							if (extractedData.powerups.includes('Blood Eater I')) {
								const percent = await utils.calculatePercentage(gameData[tempPlayer].health, 5)
								gameData[tempPlayer].health -= Math.round(gameData[tempPlayer].health / percent)
								data.rpg.modify(message.author.id, 'BenitoiteP', require('weky').randomizeNumber(50, 10), '-=', message)
							}
							if (extractedData.powerups.includes('Healing Rod I')) {
								gameData[tempPlayer].health += 3
								data.rpg.modify(message.author.id, 'GrandidieriteP', require('weky').randomizeNumber(50, 10), '-=', message)
							}
						}
						if (extractedData.powerups.includes('Blood Eater II') && chanceFor2 <= 10) {
							const percent = await utils.calculatePercentage(gameData[tempPlayer].health, 5)
							gameData[tempPlayer].health -= Math.round(gameData[tempPlayer].health / percent)
							data.rpg.modify(message.author.id, 'BerylP', require('weky').randomizeNumber(50, 10), '-=', message)
						}
						const a = await utils.calculatePercentage(randNumb, 7)
						if (gameData[tempPlayer].member === equipedHero.heroName) {
							if (extractedData.powerups.includes('Damage Invocation')) {
								gameData[tempPlayer].health -= Math.round(randNumb / a)

								data.rpg.modify(message.author.id, 'PoudretteiteP', require('weky').randomizeNumber(30, 10), '-=', message)
							} else {
								gameData[tempPlayer].health -= randNumb
							}


						} else gameData[tempPlayer].health -= randNumb

						if (extractedData.powerups.includes('Sword Agility') && gameData[tempPlayer].member === equipedHero.heroName) {
							gameData[tempPlayer].damage *= Math.floor(await utils.calculatePercentage(gameData[tempPlayer].damage, 10))

							console.log(Math.floor(await utils.calculatePercentage(gameData[tempPlayer].damage, 10))
							)
							data.rpg.modify(message.author.id, 'PoudretteiteP', require('weky').randomizeNumber(30, 10), '-=', message)
						}
						player = (player + 1) % 2;


						if (checkHealth(player)) {

							bruh = false
							const tempPlayer = (player + 1) % 2;
							async function b() {

								const canva = createCanvas(500, 281)
								const ct = canva.getContext('2d')
								const her = await Canvas.loadImage(Hero.URL);
								const mo = await Canvas.loadImage(Mob.URL);

								const HERO = await Canvas.loadImage(Hero.grey);
								const MOB = await Canvas.loadImage(Mob.grey);
								ct.drawImage(background2, 0, 0, canva.width, canva.height);
								ct.font = '20px "Comic Sans"'
								ct.fillStyle = '#0091FF'
								ct.fillText(gameData[0].damage, 440, 25) // DMG MOB
								ct.fillText(gameData[1].damage, 29, 25) // DMG HERO
								ct.font = '30px "Comic Sans"'
								ct.fillStyle = 'green'
								ct.fillText(gameData[1].member, 8, 55)
								ct.fillText(gameData[0].member, 369, 63)
								ct.font = '30px "Comic Sans"'
								ct.fillStyle = 'red'
								ct.fillText(gameData[1].health, 104, 25)  // HP HERO
								ct.fillText(gameData[0].health, 350, 25)  // HP MOB
								if (gameData[tempPlayer].member === Mob.name) {
									data.rpg.modifyStats(message.author.id, 'diedCounter', 1, '+=', message)
									data.rpg.checkIfLvlUp(message.author.id, message)
									ct.drawImage(mo, 250, 80, 250, 250);

									ct.drawImage(HERO, -10, 40, 250, 250);
									color = '#3f0000';
									winorlose = 'You lost...';
								} else if (gameData[tempPlayer].member === Hero.name.join('')) {
									data.rpg.modifyStats(message.author.id, 'mobsKilled', 1, '+=', message)
									ct.drawImage(her, -10, 40, 250, 250);

									ct.drawImage(MOB, 250, 80, 250, 250);

									color = '#7EDA2E';


									if (!extractedData.stats.mobsDefeated.includes(Mob.name)) data.rpg.modifyStats(message.author.id, 'mobsDefeated', Mob.name, 'push', message)

									await data.rpg.addXP(message.author.id, message, Math.round(xp * Mob.chanceForThings))

									winorlose = 'You won! | Got `+' + Math.round(xp * Mob.chanceForThings) + '` ' + require('../../util/utils').emojis.MoonFragments + ' empowered with **x' + Mob.chanceForThings + '**.'

								}

								gameData = [
									{
										member: Mob.name,
										health: Mob.health,
										damage: Mob.damage,
									},
									{
										member: equipedHero.heroName,
										health: equipedHero.heroHp,
										damage: equipedHero.heroDmg,
									},
								];
								let imageL = new Discord.MessageAttachment(canva.toBuffer(), 'eagames.png')

								let embedBatt = new Discord.MessageEmbed()
									.setFooter(message.author.tag + '\'s battle')
									.addField(gameData[1].member, '<:TY:845324588887703552><:PE:845324642993307718> `' + Hero.typeOf + '`\n<:DM:845319973915459604><:DM:845320037875056712> `' + gameData[1].damage + '`\n<:HP:845326275035529287><:HP:845326308417601566> `' + gameData[1].health + '`', true)
									.addField('_ _', '**' + extractedData.stats.planet + '**', true)
									.addField(gameData[0].member, '<:LO:845326936636915716><:OT:845326999403757619> `' + Mob.chanceForThings + '%`\n<:DM:845319973915459604><:DM:845320037875056712> `' + gameData[0].damage + '`\n<:HP:845326275035529287><:HP:845326308417601566> ' + `\`${gameData[0].health}\``, true)
									.attachFiles(imageL)
									.setImage('attachment://eagames.png')
									.addField('_ _', winorlose)
									.setColor(color)

								edity.delete()
								let str = '\u200b';
								extractedData.powerups.forEach((p) => {
									const wiki = require('../../data/rpg-data').powerups.find((v) => v.powerName.includes(p))
									str += '| ' + wiki.emoji + '`[' + extractedData[wiki.name + 'P'] + '%]` | '
								})
								message.reply(str, { embed: embedBatt })
							}
							b()
						}
					}
				}
				fight()
			} else {
				bruh = false
			}
		})
	})
};

module.exports.help = {
	aliases: ['bt'],
	name: 'battle',
	description: 'Fight against mobs in Weky Rpg!',
	usage: 'wek battle',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'rpg',
	cooldown: 10000,
	disable: false,
};
