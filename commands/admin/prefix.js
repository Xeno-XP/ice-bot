const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "prefix",
        aliases: ["setPrefix"],
        usage: `prefix <prefix> | prefix`,
        category: "admin",
        description: "Sets a custom bot prefix for this guild or reset it.",
    run: async (client, message, args, lang) => {

      let settings = await db.get(`settings${message.guild.id}`);

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);
    }

    if (!args[0]) {
      settings.prefix = null;
      
      db.set(`settings${message.guild.id}`, settings);
      return message.channel.send(
        `${yes}${lang.en.prefix.success.reset_prefix}`
      );
    }

    if (args[1]) {
      return message.channel.send(
        `${lang.en.prefix.errors.contains_space}${angry}`
      );
    }

    if (args[0].length > 4) {
      return message.channel.send(
        `${lang.en.prefix.errors.too_many_characters}${angry}`
      );
    }

    if(args[0].includes("`")) {
      return message.channel.send(
        `${lang.en.prefix.errors.blocked_character}${angry}`
      );
    }

    if (args.join("") === default_prefix) {

      settings.prefix = null;
      
      db.set(`settings${message.guild.id}`, settings);
      return await message.channel.send(`${yes}${lang.en.prefix.success.reset_prefix}`);
    }

    settings.prefix = args[0]

    db.set(`settings${message.guild.id}`, settings);
    await message.channel.send(`${yes}${lang.en.prefix.success.set_prefix}\`${args[0]}\``);
  }
}