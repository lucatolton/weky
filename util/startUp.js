const { Collection } = require('discord.js');
const fs = require('fs');
const readdir = require('util').promisify(fs.readdir);
const ascii = require('ascii-table');

async function startUp(client) {

	
	const asciiEvent = new ascii('Events');
	eventtable.setHeading('Event', 'Status');
	const eventFiles = fs.readdirSync('./events/').filter((file) => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`../events/${file}`);
		const nameEvent = file.split('.')[0];
		asciiEvent.addRow(eventName, '✔');
		client.on(nameEvent, event.bind(null, client));
	}
	console.log(asciiEvent.toString());

	const commandsEvent = new ascii('Commands');
	commandsEvent.setHeading('Command', 'Status');
	const folders = await readdir('./commands/');
	folders.forEach((direct) => {
		const commandFiles = fs.readdirSync(`./commands/${direct}/`).filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const files = require(`../commands/${direct}/${file}`);
			
			client.commands.set(files.help.name, files);
			client.cooldowns.set(files.help.name, new Collection());
			client.backpack.set('bp',  new Collection()); //my global "filter" of backpack retriction
			
			files.help.aliases.forEach((alias) => client.aliases.set(alias, files.help.name));
			commandsEvent.addRow(props.help.name, '✔');
		}
	});
	console.log(commandsEvent.toString());

}

module.exports = startUp;
