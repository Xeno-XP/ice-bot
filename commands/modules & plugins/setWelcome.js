const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "setWelcome",
        aliases: ["setwelcome", "setWel"],
        usage: `setWelcome <#Welcome Channel>`,
        category: "modules & plugins",
        description: "Setup Welcome Channel",
    run: async (client, message, args, lang) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);
    let settings = db.get(`settings${message.guild.id}`);
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if (!channel) {
      return message.channel.send(
        `${lang.en.general.errors.invalid_mentioned_channel}${angry}`
      );
    }

    settings.welcomeChannel = channel.id;
    db.set(`settings${message.guild.id}`, settings);

    message.channel.send(`${yes}${lang.en.general.success.set_channel} \`${channel.name}\``);
  }
}