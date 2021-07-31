
module.exports = async (client, guild) => {
	await client.channels.cache.get('835142255793930251').send('```cs\n# Guild\n' + guild.name + 
	'\n# Members\n' + guild.memberCount + '\n> ' + 
	client.guilds.cache.size + ' servers```');
};