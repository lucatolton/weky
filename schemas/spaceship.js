const mongoose = require('mongoose')
module.exports = mongoose.model('spaceship', mongoose.Schema({
    SpaceShipID: { type: String, required: true },
    SpaceShipName: { type: String, default: 'Unnamed' },
    SpaceShipIcon: { type: String, default: 'https://cdn.discordapp.com/avatars/779996223008407552/fa0fe884ad927505c19b8188bb753fe1.png' },
    SpaceShipDescription: { type: String, default: 'No description!' },
    //
    SpaceShipCaptain: { type: String, required: true },
    SpaceShipCoPilot: { type: String, default: null },
    SpaceShipOfficer: { type: String, default: null },
    SpaceShipPilots: { type: Object, default: {} },
    //
    SpaceShipMin: { type: Number, default: 1 },
    SpaceShipMax: { type: Number, default: 30000 },
    //
    SpaceShipDaily: { type: Number, default: 200 },
    SpaceShipCreatedAt: { type: Date, default: Date.now() },
}))