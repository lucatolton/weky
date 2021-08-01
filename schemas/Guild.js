const { Schema, model } = require('mongoose');

module.exports = model('guildsDB', new Schema({
	id: { type: String, required: true },
	registeredAt: { type: Number, default: Date.now(), },
	chatbot_enabled: { type: Boolean, default: false, },
	chatbot_channel: { type: String, default: null, },
	//:(
	amogus: {
		enabled: { type: Boolean, default: false },
		isThereAlreadyAGame: { type: Boolean, default: false },
		inWhatChannel: { type: String, default: null },
		whoIsInGame: { type: Object, default: {} },
		impostorGame: { type: String, default: null },
	},
}, { minimize: false })
);
