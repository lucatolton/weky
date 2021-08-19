const { Util } = require('discord.js');

module.exports = {
	name: 'afk',
	description: 'Go afk!',
	options: [
		{
			type: 'STRING',
			description: 'The reason why are you AFK',
			name: 'reason',
			required: false,
		},
	],

	run: async (client, interaction, args) => {
		const [reason] = args;

		const afkreason = reason || 'AFK';
		client.data.setAfk(interaction.user.id, afkreason);

		interaction.followUp({ content: Util.removeMentions(`You are now afk for: **\`${afkreason}\`**`) });
	},
};