module.exports = {
	name: 'ping',
	description: 'See the ping of the bot aka it\'s speed',

	run: async (client, interaction) => {
		const msg = await interaction.followUp('Pinging...');

		const apiLatency = Math.round(client.ws.ping);
		const botLatency = msg.createdTimestamp - interaction.createdTimestamp;

		msg.edit({ content: `Pong! API latency is **${apiLatency}ms**, bot latency is **${botLatency}ms**` });
	},
};