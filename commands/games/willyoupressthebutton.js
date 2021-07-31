
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
    const { WillYouPressTheButton } = require('weky');
    await WillYouPressTheButton({
        message: message,
        embed: {
            title: 'Will you press the button? | Weky Development',
            description: '```{{statement1}}```\n**but**\n\n```{{statement2}}```',
            color: '#7289da',
            timestamp: true,
        },
        button: { yes: 'Yes', no: 'No' },
        thinkMessage: 'I am thinking',
        othersMessage: 'Only <@{{author}}> can use the buttons!',
    });
};

module.exports.help = {
    aliases: ['wyptb'],
    name: 'willyoupressthebutton',
    description: 'Will You Press The Button game.',
    usage: config.prefix + 'willyoupressthebutton',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'games',
    disable: false,
    cooldown: 1000,
};