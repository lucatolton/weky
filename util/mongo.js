const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const usersDB = require('../schemas/userDB');
const guildsDB = require('../schemas/Guild');
const rpgSchema = require('../schemas/rpg');
const ssSchema = require('../schemas/spaceship');

module.exports = {
	/**
	 * @param {string} uri - Mongo Connection URI
	 */
	async connect(uri) {
		if (!uri) throw new Error('Please provide a Mongoose URI');
		return mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	},
	/**
	 * @param {string} guildID - ID of the Guild
	 */
	async getGuildDB(guildID) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		const guild = await guildsDB.findOne({ id: guildID })
		if (!guild) {
			const newG = new guildsDB({ id: guildID });
			const {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
				premium,
				badwords
			} = newG;
			await newG.save().catch(error => console.log(error));
			return {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
				premium,
				badwords
			};
		}
		else {
			const prefix = guild.prefix;
			const registeredAt = guild.registeredAt;
			const chatbot_enabled = guild.chatbot_enabled;
			const chatbot_channel = guild.chatbot_channel;
			const automeme_enabled = guild.automeme_enabled;
			const automeme_channel = guild.automeme_channel;
			const mute_role = guild.mute_role;
			const premium = guild.premium;
			const badwords = guild.badwords
			return {
				prefix,
				registeredAt,
				chatbot_enabled,
				chatbot_channel,
				automeme_enabled,
				automeme_channel,
				mute_role,
				premium,
				badwords
			};
		}
	},
	/**
   * @param {string} userID - ID of the User
   */
	async getUserDB(userID) {
		if (!userID) throw new Error('Please Provide a User ID');
		const user = await usersDB.findOne({ id: userID })
		if (!user) {
			const newUs = new usersDB({ id: userID });
			const { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers, developer, moderator } = newUs;
			await newUs.save().catch(error => console.log(error));
			return { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers, developer, moderator };
		}
		else {
			const registeredAt = user.registeredAt;
			const blacklisted = user.blacklisted;
			const blacklisted_reason = user.blacklisted_reason;
			const is_afk = user.is_afk;
			const afkReason = user.afkReason;
			const premium = user.premium;
			const tier = user.tier;
			const premiumservers = user.premiumservers;
			const developer = user.developer;
			const moderator = user.moderator;
			return { registeredAt, blacklisted, blacklisted_reason, is_afk, afkReason, premium, tier, premiumservers, developer, moderator };
		}
	},
	/**
   * @param {string} userID - ID of the User
   * @param {string} reason - afk reason
   */
	async setAfk(userID, reason) {
		if (!userID) throw new Error('Please Provide a User ID');
		if (!reason) throw new Error('AFK reason can\'t be empty!');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			await newUs.save().catch(error => console.log(error));
			return { reason };
		}
		else {
			user.is_afk = true;
			user.afkReason = reason;
			await user.save().catch(error => console.log(error));
			return { reason };
		}
	},
	/**
	* @param {string} userID - ID of the User
	*/
	async removeAfk(userID) {
		if (!userID) throw new Error('Please Provide a User ID');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			await newUs.save().catch(error => console.log(error));
			return { userID };
		}
		else {
			user.is_afk = false;
			user.afkReason = null;
			await user.save().catch(error => console.log(error));
			return { userID };
		}
	},
	/**
* @param {string} userID - ID of the User
* @param {string} toggle - blacklist toggle
* @param {string} reason - blacklisted reason
*/
	async blacklist(userID, toggle, reason) {
		if (!userID) throw new Error('Please Provide a User ID');
		if (!toggle) throw new Error('Please Provide a toggle');
		if (!reason) throw new Error('Blacklist reason can\'t be empty!');
		const user = await usersDB.findOne({ id: userID });
		if (!user) {
			const newUs = new usersDB({ id: userID });
			if (toggle == 'true') {
				user.blacklisted = true;
				user.blacklisted_reason = reason;
			}
			else {
				user.blacklisted = false;
				user.blacklisted_reason = null;
			}
			await newUs.save().catch(error => console.log(error));
			return { reason };
		}
		else {
			if (toggle == 'true') {
				user.blacklisted = true;
				user.blacklisted_reason = reason;
			}
			else {
				user.blacklisted = false;
				user.blacklisted_reason = null;
			}
			await user.save().catch(error => console.log(error));
			return { reason };
		}
	},
	/**
	 * @param {string} guildID - ID of the User
	 * @param {string} toggle - chatbot_enabled
	 */
	async setchatbot_enabled(guildID, toggle) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!toggle) throw new Error('Please Provide a toggle!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { toggle };
		}
		if (toggle == 'true') toggle = true;
		if (toggle == 'false') toggle = false;
		guild.chatbot_enabled = toggle;
		await guild.save().catch(error => console.log(error));
		return { toggle };
	},
	/**
	* @param {string} guildID - ID of the User
	* @param {string} channel - chatbot channel
	*/
	async setchatbot_channel(guildID, channel) {
		if (!guildID) throw new Error('Please Provide a Guild ID');
		if (!channel) throw new Error('Please Provide a channel!');
		const guild = await guildsDB.findOne({ id: guildID });
		if (!guild) {
			const newU = new guildsDB({ id: guildID });
			await newU.save().catch(error => console.log(error));
			return { channel };
		}
		guild.chatbot_channel = channel;
		await guild.save().catch(error => console.log(error));
		return { channel };
	},
	/**
	 * @param {id} id - ID used in finding data
	 */
	async addUser(id, message) {
		if (!message) return;
		let data = await rpgSchema.findOne({ id: id })
		if (!data) {
			data = new rpgSchema({ id: id }).save()
			message.channel.send('Heyo ' + message.author.tag + ', destiny here. I\'ve choosed you to be my hero. I will give you the identity of Dante. Goodluck in battles!')
		}
	},
	async user(id, message) {
		require('../schemas/rpg').findOne({ id: id }, async (err, data) => {
			console.log(data, id)
			await ssSchema.findOne({ id: id }).lean().exec().then(async (dataShips) => {
				if (!data || typeof data == null) {
					return this.addUser(id, message)
				} else {
					const hero_moon_1 = data.hero_moon_1;
					const hero_moon_2 = data.hero_moon_2;
					const inventory = data.inventory;
					const hero = data.hero;
					const stats = data.stats;
					const db = data;
					const ss = dataShips;
					const equipedHero = data.hero.find((e) => e.heroEquiped === true)

					return {
						id,
						hero_moon_1,
						hero_moon_2,
						inventory,
						hero,
						stats,
						db,
						ss,
						equipedHero,
					};
				}
			})
		})
	},
	async modify(id, path, value, method, message) {

		const data = await rpgSchema.findOne({ id: id })
		if (!data || typeof data == null) return this.addUser(id, message)
		this.checkForBreaking(id, message)
		if (method == '+=') {
			data[path] += value
			data.save()
		} else if (method == '-=') {
			data[path] -= value
			data.save()
		} else if (method == '=') {
			data[path] = value
			data.save()
		} else if (method == '*=') {
			data[path] *= value
			data.save()
		} else if (method == '/=') {
			data[path] /= value
			data.save()
		} else if (method == 'push') {
			data[path].push(value)
			data.save()
		} else if (method == 'delete') {
			const index = data[path].indexOf(value)
			data[path].splice(index, 1)
			data.save()
		} else if (method == '++') {
			data[path]++
			data.save()
		} else if (method == '--') {
			data[path]--
			data.save()
		}
	},
	async modifyStats(id, path, value, method, message) {

		const data = await rpgSchema.findOne({ id: id })
		if (!data || typeof data == null) return this.addUser(id, message)
		if (method == '+=') {
			data.stats[path] += value
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
		} else if (method == '-=') {
			data.stats[path] -= value
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
		} else if (method == '=') {
			data.stats[path] = value
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
		} else if (method == '*=') {
			data.stats[path] *= value
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
		} else if (method == '/=') {
			data.stats[path] /= value
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
		} else if (method == 'push') {
			data.stats[path].push(value)
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
		} else if (method == '++') {
			data.stats[path]++
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
		} else if (method == '--') {
			data.stats[path]--
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
		}
	},
	async checkIfLvlUp(id, message) {

		const data = await rpgSchema.findOne({ id: id })
		if (!data || typeof data == null) return this.addUser(id, message)
		const db = data.hero.find((e) => e.heroEquiped === true)
		const location = require('../data/rpg-data')
		let byArgs = location.hero.find((val) => val.name.includes('Aspeon'))


		if (data.stats.mobsDefeated.length === 5 && !data.stats.planetsUnlocked.includes('Moon')) {
			data.stats.planetsUnlocked.push('Moon')
			data.save()
			await rpgSchema.findOneAndUpdate({ id: id }, data)
			message.reply('<:moonRPG:854653368920047696> | **New planet!**\n`Planet`: Moon | `Boss`: OrixTEC')
		}
		let b = require('weky').randomizeNumber(1, 3)
		let i = require('weky').randomizeNumber(1, 5)
		if (db.heroMn >= db.heroLvlUpReq) {
			db.heroLvl += 1;
			let e = 500 * (1.5 + db.heroLvl)
			db.heroMn = db.heroMn / db.heroLvlUpReq;
			db.heroLvlUpReq += db.heroLvl;
			db.heroLvlUpReq *= 1.5;
			db.heroHp += 1
			db.heroDmg += 1
			this.addAero(id, message, e)
			await rpgSchema.findOneAndUpdate({ id: id }, data)
			message.channel.send(`:tada: | **${message.author.username}** leveled up!\n**${db.heroLvl}** <:lvl1:853247321549701161><:lvl2:853247321332121601> | +\`${b}\` <:HP:845326275035529287><:HP:845326308417601566> | +\`${i}\` <:DM:845319973915459604><:DM:845320037875056712> | +\`${e}\` ${require('./utils').emojis.aero}`);
		}
		const lm = await this.user(id, message)

		if (db.heroLvl === 5 && lm.db.hero.find((v) => v.heroName.includes('Aspeon')).heroUnlocked !== true && !lm.equipedHero.heroName !== 'Aspeon') {
			this.modifyHero(id, 'heroUnlocked', true, '=', 'Aspeon', message)

			message.channel.send(`${byArgs.emoji} | **New Hero!**\n\`Aspeon\`: ${byArgs.randomSentence}`);
		}
	},
	async modifyHero(id, path, value, method, name, message) {

		const data = await rpgSchema.findOne({ id: id })
		if (!data || typeof data == null) return this.addUser(id, message)
		const db = data.hero.find((e) => e.heroName.includes(name))

		if (method == '+=') {
			db[path] += value
			await rpgSchema.findOneAndUpdate({ id: id }, data)
		} else if (method == '-=') {
			db[path] -= value
			await rpgSchema.findOneAndUpdate({ id: id }, data)
		} else if (method == '=') {
			db[path] = value
			await rpgSchema.findOneAndUpdate({ id: id }, data)
		} else if (method == '*=') {
			db[path] *= value
			await rpgSchema.findOneAndUpdate({ id: id }, data)
		} else if (method == '/=') {
			db[path] /= value
			await rpgSchema.findOneAndUpdate({ id: id }, data)
		}
	},
	async addXP(id, message, xp) {
		await rpgSchema.findOne({ id: id }, async (err, data) => {
			if (!data || typeof data == null) return this.addUser(id, message)
			const db = data.hero.find((e) => e.heroEquiped === true)

			let multi = require('./utils').calculatePercentage(xp, 10)
			db.heroMn += data.OpalP > 0 ? Math.round(xp * await multi) : xp

			await data.save().catch(error => console.log(error));
			await rpgSchema.findOneAndUpdate({ id: id }, data, { upset: true })
			this.checkIfLvlUp(id, message)
		})
	},
	async addAero(id, message, value) {
		await rpgSchema.findOne({ id: id }, async (err, data) => {
			if (!data || typeof data == null) return this.addUser(id, message)
			data.powerups.includes('Aero Calling') ? data.aero += Math.round(value * 0.05) : data.aero += value
			data.powerups.includes('Aero Calling') ? data.EmeraldP -= Math.floor(Math.random() * 40) + 4 :
				this.checkForBreaking(id, message)
			data.save()
		})
	},
	async checkForBreaking(id, message) {
		await rpgSchema.findOne({ id: id }, async (err, data) => {
			if (!data || typeof data == null) return this.addUser(id, message)
			if (data.TanzaniteP <= 0 && data.powerups.includes('Loot Domination I')) return this.modify(id, 'powerups', 'Loot Domination I', 'delete')
			if (data.BenitoiteP <= 0 && data.powerups.includes('Blood Eater I')) return this.modify(id, 'powerups', 'Blood Eater I', 'delete')
			if (data.GrandidieriteP <= 0 && data.powerups.includes('Healing Rod I')) return this.modify(id, 'powerups', 'Healing Rod I', 'delete')
			if (data.PoudretteiteP <= 0 && data.powerups.includes('Damage Invocation')) return this.modify(id, 'powerups', 'Damage Invocation', 'delete')
			if (data.BerylP <= 0 && data.powerups.includes('Perfect Shoot')) return this.modify(id, 'powerups', 'Perfect Shoot', 'delete')
			if (data.JadeiteP <= 0 && data.powerups.includes('Blood Eater II')) return this.modify(id, 'powerups', 'Blood Eater II', 'delete')
			if (data.OpalP <= 0 && data.powerups.includes('Level Rain')) return this.modify(id, 'powerups', 'Level Rain', 'delete')
			// if(data.Ruby >= 0) return this.modify(id, 'powerups', 'Loot Domination I', 'delete')
			// if(data.EmeraldP >= 0) return this.modify(id, 'powerups', 'Loot Domination I', 'delete')
			// if(data.DiamondP >= 0) return this.modify(id, 'powerups', 'Loot Domination I', 'delete')
			// if(data.TanzaniteP >= 0) return this.modify(id, 'powerups', 'Loot Domination I', 'delete')
		})
	}
};