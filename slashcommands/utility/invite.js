const { Client, CommandInteraction, MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Support the bot!",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        var embed = new MessageEmbed()
            .addField("**Weky Bot**", "All these links helps me to grow!")

        let btnInvite = new MessageButton()
            .setLabel('Premium!')
            .setStyle('LINK')
            .setURL('https://patreon.com/weky')

        let btnBuy = new MessageButton()
            .setLabel('Invite me!')
            .setStyle('LINK')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=809496186905165834&permissions=261188086870&scope=applications.commands%20bot')

        let btnJoin = new MessageButton()
            .setLabel('Support server!')
            .setStyle('LINK')
            .setURL('https://discord.gg/2EZSpxNB5z')

        interaction.followUp({ embeds: [embed], components: [new MessageActionRow().addComponents([btnInvite, btnBuy, btnJoin])] })
    },
};