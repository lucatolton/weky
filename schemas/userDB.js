const { Schema, model } = require('mongoose');

module.exports = model('usersDB', new Schema({
	id: { type: String, },
	registeredAt: { type: Number, default: Date.now() },

	blacklisted: { type: Boolean, default: false },
	blacklisted_reason: { type: String, default: null },

	is_afk: { type: Boolean, default: false },
	afkReason: { type: String, default: null },

	premium: { type: Boolean, default: false },
	moderator: { type: Boolean, default: false },
	cooldowns: { type: Object, default: {} },
}, { minimize: false }));