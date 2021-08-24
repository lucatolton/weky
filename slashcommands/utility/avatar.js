const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'See your avatar or some else\'s!',
	options: [
		{
			type: 'USER',
			description: 'The user',
			name: 'user',
			required: false,
		},
	],

	run: async (client, interaction, args) => {
		const [user] = args;

		const user2 = client.users.cache.get(user) ?? interaction.user;

		const embed = new MessageEmbed()
			.setTitle(`${user2.tag}'s avatar!`)
			.setColor('#e4101f')
			.setImage(user2.displayAvatarURL({ size: 4096, dynamic: true }));

		interaction.followUp({ embeds: [embed] });
	},
};