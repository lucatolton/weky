const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'setchat',
	description: 'Set the chatbot!',
	options: [
		{
        	type: 'CHANNEL',
        	description: 'The channel to set the chat bot to',
        	name: 'channel',
        	required: true,
		},
		{
        	type: 'BOOLEAN',
        	description: 'If we should disable or enable the chatbot',
        	name: 'toggle',
        	required: true,

		},
	],

	run: async (client, interaction, args) => {

		if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.followUp({ content: 'You don\'t have the permission to do that! \nYou require the `MANAGE CHANNELS` permission.' });

		await client.data.setchatbot_enabled(interaction.guildId, args[1] ? 'true' : 'false');
		await client.data.setchatbot_channel(interaction.guildId, args[0]);
		const me = new MessageEmbed()
			.setColor('GREEN')
			.setDescription(`Success, chatbot set to \`${args[1] ? 'true' : 'false'}\` in <#${args[0]}>`);
		interaction.followUp({ embeds: [me] });

	},
};