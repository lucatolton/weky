const util = require('util');
const { glob } = require('glob');
const globPromise = util.promisify(glob);
const express = require('express');
const top = require('top.gg-core');
const fetch = require('node-fetch');
const webhook = new top.Webhook(process.env.topggPass);
const MessageEmbed = require('discord.js');
const app = express();
const utils = require('../util/utils');

module.exports = async (client) => {
	client.user.setActivity(`in ${client.guilds.cache.size} servers! | wek invite`, { type: 'PLAYING' });

	const slashCommands = await globPromise(
		`${process.cwd()}/slashcommands/*/*.js`,
	);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);
		arrayOfSlashCommands.push(file);
	});

	await client.application.commands.set(arrayOfSlashCommands);


	app.post('/tog-gg', webhook.advanced(), async (req) => {
		const user = await fetch(`https://discord.com/api/v8/users/${req.vote.user}`, {
			headers: {
				Authorization: `Bot ${process.env.token}`,
			},
		}).then(res => res.json());
		const embed = new MessageEmbed()
			.setAuthor(client.user.username, client.user.displayAvatarURL(), 'https://top.gg/bot/809496186905165834/vote')
			.setURL('https://top.gg/bot/809496186905165834/vote')
			.setColor('#ffd984')
			.setThumbnail(user.displayAvatarURL())
			.setDescription(`**${user.tag}** (${user.id}) just voted for me!`)
			.setTimestamp();
		client.channels.cache.get('860258180424663040').send(embed);
		try {
			user.send(`Thanks for voting for me!\nYou received ** 4000 ${utils.emojis.aero}**, **1 ${utils.emojis.Beryl}**, **3 ${utils.emojis.Jadeite}**!`);
		}
		catch(err) {
			return;
		}
		client.data.modify(user.id, 'Beryl', 1, '+=');
		client.data.modify(user.id, 'Jadeite', 3, '+=');
		client.data.addAero(user.id, 4000);
	});

	app.listen(process.env.port || 3000, () => {
		console.log(`Weky listening on port ${process.env.port || 3000}`);
	});
};
