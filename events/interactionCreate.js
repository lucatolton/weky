module.exports = async (client, interaction) => {
	if (interaction.isCommand()) {
		await interaction.deferReply({ ephemeral: false });

		const cmd = client.slashCommands.get(interaction.commandName);

		try {
			const args = [];

			for (const option of interaction.options.data) {
				if (option.type === 'SUB_COMMAND') {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				}
				else if (option.value) {
					args.push(option.value);
				}
			}
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);

			cmd.run(client, interaction, args);
		}
		catch (error) {
			interaction.followUp({ content: 'An error jumped over the window when i was executing this, try again later', ephemeral: true });
		}
	}
};