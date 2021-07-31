const Aspeon = ['Let\'s go!', 'Mobs, i come!', 'I\'m ready!', 'Let me punch them!', 'I love fighting.', 'Ah, stop please.. i know that im over power!', 'Yes i am a girl, any problems?']
const Dante = ['Man.. the moyai seems too powerful.', 'Yeah, im coming!', 'I never forget about you! Sword!', 'Im never giving up!', 'I love eating MN.', 'Power ups i need power upsss!']

module.exports.hero = [
  {
    name: ["Dante"],
    emoji: "<:dante:844962602962649103>",
    URL: 'https://cdn.discordapp.com/attachments/797153662195466312/844967177467199518/Untitled309_20210514204440.png',
    grey: 'https://cdn.discordapp.com/attachments/812590454821355543/854677751981146132/greyscale.png',
    typeOf: "Default",
    damage: 9,
    randomSentence: Dante[Math.floor(Math.random() * Dante.length)],
    icon: "https://cdn.discordapp.com/attachments/798509295712075795/846613005840023612/Untitled332_20210525115718.png",
    health: 45,
  },
  {
    name: ["Aspeon"],
    emoji: "<:aspeonRPG:853932211116310559>",
    URL: 'https://cdn.discordapp.com/attachments/812590454821355543/853937742878081044/aspeon.png',
    grey: 'https://cdn.discordapp.com/attachments/812590454821355543/854678232846172210/greyscale.png',
    typeOf: "Fighter",
    icon: "https://cdn.discordapp.com/attachments/812590454821355543/853945101298565200/Untitled356_20210614170729.png",
    damage: 15,
    randomSentence: Aspeon[Math.floor(Math.random() * Aspeon.length)],
    health: 41,
  },
]

module.exports.powerups = [
  {
    name: "Poudretteite",
    aliases: ["poudretteite", 'poud', 'poudre', 'retteite'],
    emoji: require('../util/utils').emojis.Poudretteite,
    emojiID: require('../util/utils').emojis.PoudretteiteID,
    cost: 550,
    durability: 150,
    powerName: "Damage Invocation",
    description: "**Poudretteite** constrols the enemy damage by a invocation stolen from Worm that is 129 years old. This invocation allows the owner to poison the enemy and decrease the power of enemy's arms which makes it do less damage by `7%`."
  },
  {
    name: "Tanzanite",
    aliases: ["tanzanite", 'tanz', 'tanza', 'tanzanit'],
    emoji: require('../util/utils').emojis.Tanzanite,
    emojiID: require('../util/utils').emojis.TanzaniteID,
    cost: 1500,
    durability: 350,
    powerName: "Loot Domination I",
    description: "**Tanzanite** searches in the enemy's dead body to find more loot by `10%`"
  },
  {
    name: "Benitoite",
    aliases: ["benitoite", 'ben', 'beni', 'benitoit'],
    emoji: require('../util/utils').emojis.Benitoite,
    emojiID: require('../util/utils').emojis.BenitoiteID,
    cost: 5300,
    durability: 400,
    powerName: "Blood Eater I",
    description: "**Benitoite** calls bats by the refected light to bite the enemy and the blood of it flows, which has a chance of `5/100` damages `10%` of its health."
  },
  {
    name: "Grandidierite",
    aliases: ["grandidierite", 'gran', 'grand', 'grandi'],
    emoji: require('../util/utils').emojis.Grandidierite,
    emojiID: require('../util/utils').emojis.GrandidieriteID,
    cost: 8700,
    durability: 540,
    powerName: "Healing Rod I",
    description: "**Grandidierite** gets the hidden rod from earth and hits it hard of earth and has a chance of `5%` to scatter particles of life for the hero and add `3 hp`."
  },
  {
    name: "Beryl",
    aliases: ["ber", 'bery', 'beryl'],
    emoji: require('../util/utils').emojis.Beryl,
    emojiID: require('../util/utils').emojis.BerylID,
    cost: 13000,
    durability: 450,
    powerName: "Blood Eater II",
    description: "**Beryl** calls bats by the refected light to bite the enemy and the blood of it flows, which has a chance of `10/100` damages `10%` of its health."
  },
  {
    name: "Jadeite",
    aliases: ["jadeite", 'jad', 'jade', 'jadeit'],
    emoji: require('../util/utils').emojis.Jadeite,
    emojiID: require('../util/utils').emojis.JadeiteID,
    cost: 14400,
    durability: 200,
    powerName: "Sword Agility",
    description: "**Jadeite** makes the legendary sword to come belong the agility offered by it. Giving the hero `10%` damage."
  },
  {
    name: "Opal",
    aliases: ["op", 'opa', 'opal'],
    emoji: require('../util/utils').emojis.Opal,
    emojiID: require('../util/utils').emojis.OpalID,
    cost: 17500,
    durability: 750,
    powerName: "Level Rain",
    description: "**Opal** starts a rain of moon fragments and multiply the total with `10%`"
  },
  //NON SHOP
  {
    name: "Ruby",
    aliases: ["ru", 'rub', 'ruby'],
    emoji: require('../util/utils').emojis.Ruby,
    emojiID: require('../util/utils').emojis.RubyID,
    cost: false,
    powerName: "",
    description: ""
  },
  {
    name: "Sapphire",
    aliases: ["sapp", 'sapphir', 'sapphire'],
    emoji: require('../util/utils').emojis.Sapphire,
    emojiID: require('../util/utils').emojis.SapphireID,
    cost: false,
    powerName: "",
    description: ""
  },
  {
    name: "Emerald",
    aliases: ["em", 'emer', 'emerald'],
    emoji: require('../util/utils').emojis.Emerald,
    emojiID: require('../util/utils').emojis.EmeraldID,
    cost: false,
    powerName: "Aero Calling",
    description: ""
  },
  {
    name: "Diamond",
    aliases: ["diam", 'diamon', 'diamond'],
    emoji: require('../util/utils').emojis.Diamond,
    emojiID: require('../util/utils').emojis.DiamondID,
    cost: false,
    powerName: "",
    description: ""
  }
]