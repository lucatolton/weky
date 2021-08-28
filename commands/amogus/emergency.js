const config = require('../../util/config.json');
const { MessageButton, Util } = require('discord.js');

module.exports.run = async (client, message) => {

	const schema = require('../../schemas/Guild');


	await schema.findOne({ id: message.guild.id }, async (err, dat) => {

		if (message.channel.id !== dat.amogus.inWhatChannel) return message.channel.send('A game is already running but you\'re not in it!');

		let myMap = new Map();
		const components = [
			{
				type: 1, components: [],
			},
			{
				type: 1, components: [],
			},
			{
				type: 1, components: [{ type: 2, style: 'SECONDARY', label: 'I skip.', customId: `skip-${message.channel.id}` }],
			},
		];
		const users = dat.amogus.whoIsInGame;
		const colors = ['DANGER', 'SUCCESS', 'SECONDARY', 'PRIMARY'];
		let i = -1;
		let skiped = 0;
		let clickers = [];
		let um = [];
		let w = '';

		await Object.values(users).forEach(async (umm) => {
			i++;
			const randoms = colors[Math.floor(Math.random() * colors.length)];
			const x = Object.keys(users)[i];
			const xd = client.users.cache.get(x);
			myMap.set(x, 0);
			um.push(xd.id);


			if (i <= Object.keys(users).length / 2) {
				components[0].components.push(
					new MessageButton()
						.setStyle(randoms)
						.setEmoji(Util.parseEmoji(umm).id)
						.setLabel(xd.username)
						.setCustomId(String(i)),
				);
			}
			else
			if (i <= Object.keys(users).length) {
				components[1].components.push(
					new MessageButton()
						.setStyle(randoms)
						.setEmoji(Util.parseEmoji(umm).id)
						.setLabel(xd.username)
						.setCustomId(String(i)),
				);
			}
		});
		if(components[1].components.length === 0) {
			components.splice(1, 1);
		}
		message.channel.send({
			content: 'Vote! Ends in 50s!',
			components: components,
		}).then(async (msg) => {

			const coll = await msg.createMessageComponentCollector({ filter: ((x) => x), componentType: 'BUTTON' });

			coll.on('collect', async b => {
				if (clickers.includes(b.user.id)) return b.reply({ content: 'You already voted!', ephemeral: true });
				if(!users[b.user.id]) return b.reply({ content: 'You are not in this game.' });

				const xd = um[parseInt(b.customId)];
				const h = client.users.cache.get(xd);

				if (b.customId == `skip-${b.channel.id}`) {
					b.reply({ content: 'You voted for `skip`!', ephemeral: true });
					clickers.push(b.user.id);
					skiped += 1;
				}
				else {
					b.reply({ content: 'You voted for ' + h.username + '!', ephemeral: true });
					clickers.push(b.user.id);
					myMap.set(h.id, myMap.get(h.id) + 1);
				}
			});
			setTimeout(async () => {
				try {
					msg.delete();
				}
				catch(e) {
					return;
				}
				myMap[Symbol.iterator] = function* () {
					yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
				};

				myMap.forEach(async (u, n) => {
					if ([...myMap].sort(c)[[...myMap].length - 1][0] == n && [...myMap].sort(c)[[...myMap].length - 1][1] == [...myMap].sort(c)[[...myMap].length - 2][1]) {
						return w += users[[...myMap].sort(c)[[...myMap].length - 1][0]] + ' **' + message.guild.members.cache.get(n).user.username + '**: `' + [...myMap].sort(c)[[...myMap].length - 1][1] + '`\n';
					}
					if ([...myMap].sort(c)[[...myMap].length - 2][0] == n && [...myMap].sort(c)[[...myMap].length - 1][1] == [...myMap].sort(c)[[...myMap].length - 2][1]) {
						return w += users[[...myMap].sort(c)[[...myMap].length - 2][0]] + ' **' + message.guild.members.cache.get(n).user.username + '**: `' + [...myMap].sort(c)[[...myMap].length - 2][1] + '`\n';
					}
					if ([...myMap][[...myMap].length - 1][0] == n) {
						return w += users[n] + ' **' + message.guild.members.cache.get(n).user.username + '**: `' + u + '`\n';
					}
					return w += users[n] + ' **' + message.guild.members.cache.get(n).user.username + '**: ' + u + '\n';
				});

				function c(a, b) {
					if (a[1] === b[1]) {
						return 0;
					}
					else {
						return (a[1] < b[1]) ? -1 : 1;
					}
				}
				w += '**Skips**: ' + skiped + '\n';


				message.channel.send(w);
				if (skiped > [...myMap][[...myMap].length - 1][1]) {
					return message.channel.send('Skipped!');
				}
				else if ([...myMap].sort(c)[[...myMap].length - 1][1] == [...myMap].sort(c)[[...myMap].length - 2][1]) {
					return message.channel.send('Tie!');
				}
				else {
					message.channel.send('<@' + [...myMap][[...myMap].length - 1][0] + '> has been ejected!');
					message.channel.permissionOverwrites.edit(client.users.cache.get([...myMap][[...myMap].length - 1][0]), {
						SEND_MESSAGES: false,
						VIEW_CHANNEL: false,
					});
					message.channel.send([...myMap][[...myMap].length - 1][0] == dat.amogus.impostorGame ? 'He/she was the impostor.' : 'He/she was not the impostor.');
					if ([...myMap][[...myMap].length - 1][0] == dat.amogus.impostorGame) {
						let em = '';
						Object.entries(users).forEach((hh) => {
							if (Object.keys(hh)[0] !== dat.amogus.impostorGame) em += Object.values(hh)[1];
						});
						message.channel.send(em + ' **Victory!**\nDeleting the channel in 10s!').then(() => {
							setTimeout(() => {
								message.channel.delete();
							}, 10000);
						});
					}
					delete users[[...myMap][[...myMap].length - 1][0]];
					delete [...myMap][[...myMap].length - 1];
					await schema.findOneAndUpdate({ id: message.guild.id }, dat, { upset: true });

				}
				coll.stop();
				myMap = new Map();
				clickers = [];
				um = [];
			}, 50000);
		});

	});
};

module.exports.help = {
	aliases: [],
	name: 'emergency',
	description: '',
	usage: config.prefix + 'ban @user %reason%',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'amogus',
	disable: false,
	cooldown: 50000,
};