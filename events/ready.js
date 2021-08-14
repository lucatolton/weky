const util = require('util');
const { glob } = require("glob");
const globPromise = util.promisify(glob);

module.exports = async (client) => {
  client.user.setActivity(`in ${client.guilds.cache.size} servers! | wek invite`, { type: "PLAYING" });

  const slashCommands = await globPromise(
    `${process.cwd()}/slashcommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    arrayOfSlashCommands.push(file);
  });

  await client.guilds.cache.get("812590454821355540").commands.set(arrayOfSlashCommands);
}