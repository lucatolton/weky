


const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
    const { GuessThePokemon } = require('weky');
    await GuessThePokemon({
        message: message,
        embed: {
            title: 'Guess The Pokémon | Weky Development',
            description:
                '**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.',
            color: '#7289da',
            timestamp: true,
        },
        thinkMessage: 'I am thinking',
        othersMessage: 'Only <@{{author}}> can use the buttons!',
        winMessage:
            'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
        loseMessage: 'Better luck next time! It was a **{{answer}}**.',
        time: 60000,
        incorrectMessage: "No {{author}}! The pokémon isn't `{{answer}}`",
        buttonText: 'Cancel',
    });
};

module.exports.help = {
    aliases: ['gtp'],
    name: 'guessthepokemon',
    description: 'Guess The Pokemon game.',
    usage: config.prefix + 'guessthepokemon',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'games',
    disable: false,
    cooldown: 1000,
};