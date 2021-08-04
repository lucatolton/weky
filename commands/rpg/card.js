
const Discord = require('discord.js');
const config = require('../../util/config.json');
const rpgSchema = require('../../schemas/rpg')

module.exports.run = async (client, message, args, utils, data) => {
	await rpgSchema.findOne({ id: message.author.id }).lean().exec().then(async (extractedData) => {
        if (!extractedData || typeof extractedData == null) return client.data.addUser(message.author.id, message)
		const equipedHero = extractedData.hero.find((e) => e.heroEquiped === true)

		let total = equipedHero.heroMn
		let needMore = Math.round(equipedHero.heroLvlUpReq)

		var number = 0
		const { createCanvas, registerFont } = require('canvas')
		const Canvas = require('canvas')
		const location = require('../../data/rpg-data')
		const heroFinder = location.hero.find((val) => val.name.includes(equipedHero.heroName));


		const canvas = createCanvas(500, 700)
		const ctx = canvas.getContext('2d')

		const mob = await Canvas.loadImage(heroFinder.icon);
		let x = 85
		let y = 300
		let z = 288
		let heroes = require("../../data/rpg-data")

		let daFinder = heroes.hero.find((val) => val.name.includes(equipedHero.heroName));
		registerFont('cute.ttf', { family: 'Cute' })


		ctx.fillStyle = "#1f1e1e";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.drawImage(mob, 100, 14, 300, 300);


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


		//hhhhhhhhhhhhhhhhhhhhh
		ctx.beginPath();
		ctx.fillStyle = 'blue';

		ctx.arc(x, y + number, 12, 0.5 * Math.PI, 1.5 * Math.PI, false);
		ctx.fill();
		ctx.fillRect(x, z + number, ((total / needMore) * 325), 24);
		ctx.arc(x + ((total / needMore) * 325), y + number, 12, .5 * Math.PI, 1.5 * Math.PI, true);
		ctx.fill();

		ctx.closePath();

		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '20px "Cute"';
		ctx.fillText(`${total} / ${needMore}`, x + 162.5, 307.5 + number);

		ctx.beginPath();
		ctx.rect(0, 500, 500, 6);
		ctx.fillStyle = '#ff000'
		ctx.fill()

		ctx.drawImage(await Canvas.loadImage(__dirname + '/assets/dmgText.png'), 20, 600, 60, 60);
		ctx.drawImage(await Canvas.loadImage(__dirname + '/assets/heartText.png'), 20, 520, 60, 60);
		ctx.drawImage(await Canvas.loadImage(__dirname + '/assets/lvlText.jpg'), 300, 520, 60, 60);

		ctx.drawImage(await Canvas.loadImage(__dirname + '/assets/dmg.png'), 370, 0, 60, 60);
		ctx.drawImage(await Canvas.loadImage(__dirname + '/assets/heart.png'), 0, 0, 60, 60);
		ctx.stroke()
		//stats ---------------------------------------
		ctx.beginPath()
		ctx.font = '25px "Cute"';
		ctx.fillStyle = '#C10039';
		ctx.fillText(equipedHero.heroHp, 100, 560);
		ctx.stroke();

		ctx.beginPath()
		ctx.font = '25px "Cute"';
		ctx.fillStyle = '#007DC5';
		ctx.fillText(equipedHero.heroDmg, 100, 640);
		ctx.stroke();

		ctx.beginPath()
		ctx.font = '25px "Cute"';
		ctx.fillStyle = '#00889B';
		ctx.fillText(equipedHero.heroLvl, 380, 560);
		ctx.stroke();
		//hp^dmg ---------------------------------------
		ctx.beginPath()
		ctx.font = '25px "Cute"';
		ctx.fillStyle = '#C10039';
		ctx.fillText(daFinder.health, 80, 43);
		ctx.stroke();

		ctx.beginPath()
		ctx.font = '25px "Cute"';
		ctx.fillStyle = '#007DC5';
		ctx.fillText(daFinder.damage, 430, 43);
		ctx.stroke();

		const iconsAttachment = new Discord.MessageAttachment(canvas.toBuffer(), 'icons.png')
		message.reply(iconsAttachment)
	})
	};

	module.exports.help = {
		aliases: ['c'],
		name: 'card',
		description: 'Displays your hero stats!',
		usage: 'wek card',
	};

	module.exports.config = {
		args: false,
		restricted: false,
		category: 'rpg',
		cooldown: 3000,
		disable: false,
	};