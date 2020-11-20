const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const { defCol } = require("../../colors.json");

module.exports = {
        name: "language",
        aliases: ["setlanguage"],
        usage: `language [language]`,
        category: "admin",
        description: "Sets a custom bot prefix for this guild or reset it.",
    run: async (client, message, args, lang) => {
      return message.channel.send("This command is still in development, check back later.");
      
    //   let settings = await db.get(`settings${message.guild.id}`);
    //   let languageOptions = ["bg", "en"];

    // if (!message.member.hasPermission("ADMINISTRATOR")) {
    //   return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);
    // }

    // if (!args[0]) {
    //   settings.language = null;
      
    //   db.set(`settings${message.guild.id}`, settings);
    //   return message.channel.send(
    //     `${yes}Reset this server's language.`
    //   );
    // }

    // if (languageOptions.includes(args[0].toLowerCase())) {
    //   settings.language = args[0].toLowerCase();
    // } else {
    //   return message.channel.send(new MessageEmbed()
    //     .setColor(defCol)
    //     .setTitle("Invalid LANGUAGE argument given")
    //     .setDescription(`**Possible values:**\n\n\`"${languageOptions.join('", "')}"\``)
    //   )
    // }

    // db.set(`settings${message.guild.id}`, settings);
    // await message.channel.send(`${yes}Set this server's language to **${settings.language}**.`);
  }
}