const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message) => {
	const got = require('got');
	const embed = new Discord.MessageEmbed();
	got('https://www.reddit.com/r/memes/random/.json').then(response => {
		const content = JSON.parse(response.body);
		const permalink = content[0].data.children[0].data.permalink;
		const memeUrl = `https://reddit.com${permalink}`;
		const memeImage = content[0].data.children[0].data.url;
		const memeTitle = content[0].data.children[0].data.title;
		const memeUpvotes = content[0].data.children[0].data.ups;
		const memeDownvotes = content[0].data.children[0].data.downs;
		const memeNumComments = content[0].data.children[0].data.num_comments;
		embed.setTitle(`${memeTitle}`);
		embed.setURL(`${memeUrl}`);
		embed.setImage(memeImage);
		embed.setColor('RANDOM');
		embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
		message.channel.send({ embeds: [embed] });
	});
};

module.exports.help = {
	aliases: [],
	name: 'meme',
	description: 'Sending reddit memes.',
	usage: config.prefix + 'meme',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'fun',
	disable: false,
	cooldown: 1000,
};
