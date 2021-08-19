module.exports = {
	name: 'uptime',
	description: 'See bot\'s uptime!',

	run: async (client, interaction) => {
		const days = Math.floor(client.uptime / 86400000);
		const hours = Math.floor(client.uptime / 3600000) % 24;
		const minutes = Math.floor(client.uptime / 60000) % 60;
		const seconds = Math.floor(client.uptime / 1000) % 60;
		interaction.followUp({ content: `**__Uptime:__**\nWeky is online since ${days}**d **${hours}**h **${minutes}**m **${seconds}**s**!` });

	},
};