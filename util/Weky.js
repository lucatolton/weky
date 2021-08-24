const { Client, Collection, Intents } = require('discord.js');

class Weky extends Client {
	constructor() {
		super({
// 			allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
		});

		this.commands = new Collection();
		this.slashCommands = new Collection();
		this.cooldowns = new Collection();
		this.aliases = new Collection();
		this.events = new Collection();
		this.snipes = new Collection();
		this.esnipes = new Collection();
		this.tempCollector = {};
		this.data = require('./mongo');
	}

	born(token, mongoDB) {
		require('./start')(this);
		require('dotenv').config();

		this.data.connect(mongoDB).then(() => {
			console.log('Connected to MongoDB database!');
		}).catch((err) => {
			console.log(err);
		});

		this.login(token);
	}
}

module.exports = Weky;
