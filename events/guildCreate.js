module.exports = async (client, guild) => {
	await client.channels.cache.get('835142227545686086').send(
		'```md\n# Guild\n' + guild.name +
		'\n# Members\n' + guild.memberCount + '\n> ' +
		client.guilds.cache.size + ' servers```');
};