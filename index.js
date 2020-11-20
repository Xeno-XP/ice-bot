(async function () {
    // Load all the modules
    const discord = require("discord.js");
    const ini = require("ini");
    const fs = require("fs");

    // Init vital variables
    const client = new discord.Client({
        partials: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING', 'GUILD_MESSAGE_TYPING'],
        ws: { intents: discord.Intents.ALL }
    });
    const config = require(`${process.cwd()}/config.json`);
    let token = ini.parse(fs.readFileSync('./token.ini', 'utf-8')).configuration;

    // Load all the handlers
    require(config.handler_loader_path)(client);

    // Login
    if (client.config.both) {
        client.login(token.testingToken);
        client.login(token.mainToken);
    };
    
    if (client.config.experimental && !client.config.both) {
        client.login(token.testingToken);
    } else if (!config.both) {
        client.login(token.mainToken);
    };
})();