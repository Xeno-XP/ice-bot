const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix, ownerid } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "setNick",
        aliases: ["setNickname", "setName", "setnick", "setnickname"],
        usage: `setNick <@user> <nick>`,
        category: "moderation",
        description: "Change the nickname of a user.",
    run: async (client, message, args, lang) => {

    if(!message.guild.me.hasPermission("MANAGE_NICKNAMES") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
    if(!message.member.hasPermission('MANAGE_NICKNAMES') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)

    let isNickanemReset = false;
    let newname = args.slice(1).join(" ");
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(`${lang.en.general.errors.invalid_mentioned_user}${angry}`)

    if (!newname || newname == "" || newname == " ") {
      isNickanemReset = true;
    }

    message.guild.member(user).setNickname(newname).then(() => {
      if (!isNickanemReset) {
        message.channel.send(`${yes}${lang.en.nick.success.set_nick} **${newname}**`);
      } else {
        message.channel.send(`${yes}Reset ${user.user.username}'s nickname.`);
      }
    });
  }
}