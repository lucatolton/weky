const mongoose = require('mongoose')
const items = require("../data/rpg-data");
const profileSchema = mongoose.Schema({
  id: { type: String, required: true },
  hero: {
    type: Array, default: [{
      heroName: "Dante",
      heroEquiped: true,
      heroUnlocked: true,
      heroLvl: 0,
      heroMn: 0,
      heroLvlUpReq: 30,
      heroDmg: 9,
      heroHp: 45,
    },
    {
      heroName: "Aspeon",
      heroEquiped: false,
      heroUnlocked: false,
      heroLvl: 0,
      heroMn: 0,
      heroLvlUpReq: 30,
      heroDmg: 15,
      heroHp: 41,
    }]
  },

  aero: { type: Number, default: 1000 },

  Tanzanite: { type: Number, default: 0 },
  Benitoite: { type: Number, default: 0 },
  Grandidierite: { type: Number, default: 0 },
  Poudretteite: { type: Number, default: 0 },
  Beryl: { type: Number, default: 0 },
  Jadeite: { type: Number, default: 0 },
  Opal: { type: Number, default: 0 },
  Ruby: { type: Number, default: 0 },
  Sapphire: { type: Number, default: 0 },
  Emerald: { type: Number, default: 0 },
  Diamond: { type: Number, default: 0 },

  TanzaniteP: { type: Number, default: 0 },
  BenitoiteP: { type: Number, default: 0 },
  GrandidieriteP: { type: Number, default: 0 },
  PoudretteiteP: { type: Number, default: 0 },
  BerylP: { type: Number, default: 0 },
  JadeiteP: { type: Number, default: 0 },
  OpalP: { type: Number, default: 0 },
  Ruby: { type: Number, default: 0 },
  SapphireP: { type: Number, default: 0 },
  EmeraldP: { type: Number, default: 0 },
  DiamondP: { type: Number, default: 0 },

  powerups: {type: Array, default: []},

  rocks: {
    DiamondP: { type: Number, default: 0 },
  },
  stats: {
    planet: { type: String, default: "Terra" },
    planetsUnlocked: { type: Array, default: ['Terra'] },

    mobsKilled: { type: Number, default: 0 },
    diedCounter: { type: Number, default: 0 },
    mobsDefeated: { type: Array, default: [] },
    
    timeQuest: { type: Number, default: null },
    hasQuest: { type: Boolean, default: false },

    isInSpaceShip: { type: Boolean, default: false },
    inWhatSpaceShip: { type: String, default: null },

    stamina: { type: Number, default: 100 },
    totalMn: { type: Number, default: 0 },
  }
})
module.exports = mongoose.model('rpg', profileSchema)