module.exports = async (client) => {
  client.user.setActivity(`in ${client.guilds.cache.size} servers! | wek invite`, { type: "PLAYING" });
}