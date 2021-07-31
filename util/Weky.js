const { Client, Collection } = require('discord.js');

class Weky extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection();
		this.cooldowns = new Collection();
		this.aliases = new Collection();
		this.events = new Collection();
		this.snipes = new Collection();
		this.esnipes = new Collection();
		this.backpack = new Collection();
		this.tempCollector = {}
		this.data = require('./mongo');
	}

	born(token, mongoDB) {
		require('./start')(this);
		require('../data/backpack')(this)
		require('discord-buttons')(this)
		require(`../reply`)
		require('dotenv').config()

		this.data.connect(mongoDB).then(() => {
			console.log('Connected to MongoDB database!');
		}).catch((err) => {
			console.log(err);
		});

		this.login(token);
	}
}

module.exports = Weky;