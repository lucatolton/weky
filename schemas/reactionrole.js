const { Schema, model } = require('mongoose');

module.exports = model('buttonroles', new Schema({
	GuildID: { type: String, required: true },
	MessageID: { type: String, required: true },
	RoleID: { type: String, required: true },
	ChannelID: { type: String, required: true },
	Text: { type: String, required: true },
	colorButton: { type: String, required: true },
	ID: { type: String, required: true },
	ClickedBy: { type: Array, required: true },
})
);