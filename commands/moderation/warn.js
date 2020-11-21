const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix, ownerid } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "warn",
        usage: `warn <@user> <reason>`,
        category: "moderation",
        description: "Warns a user from the server.",
    run: async (client, message, args, lang) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
    let warnMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!warnMember) return message.channel.send(`${lang.en.general.errors.invalid_mentioned_user}${angry}`)
    if(warnMember.id === message.author.id) return message.channel.send(`${lang.en.general.errors.cant_execute_on_self}${stupid}`);
    if(warnMember.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send(`${lang.en.general.errors.cant_execute_on_staff}${stupid}`)
    let reason = args.slice(1).join(" ")
    if(!reason) reason = lang.en.general.errors.no_reason_provided;
    
    let warns = db.get(`warns${message.guild.id}${warnMember.id}`);
    
    if(!warns) {
      warns = [];
    };
    
    warns.push(reason);
    
      let channelEmbed = new discord.MessageEmbed()
          .setAuthor(`${warnMember.user.tag} has been warned`, warnMember.user.displayAvatarURL({ dynamic: true }))
          .setColor(defCol)
          .setTimestamp()
          .setDescription(`**Reason:** ${reason}`)

    message.channel.send(channelEmbed)

    db.set(`warns${message.guild.id}${warnMember.id}`, warns);
    }
}