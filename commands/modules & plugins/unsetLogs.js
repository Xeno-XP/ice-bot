const  { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const discord = require('discord.js')

module.exports = {
        name: "unsetLogs",
        aliases: ["unsetlogs"],
        category: "modules & plugins",
        description: "Unsets the Logs Channel.",
    run: async (client, message, args, lang) => {
    if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
    if(!message.member.hasPermission("MANAGE_WEBHOOKS") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)

    let settings = db.get(`settings${message.guild.id}`);
  
        if (settings.auditLog) {
            settings.auditLog = null;
            db.set(`settings${message.guild.id}`);
            await message.channel.send(`${yes}${lang.en.logs.success.unset_logs_channel}`);
        } else {
            return message.channel.send(`${lang.en.logs.errors.doesnt_have_logs}${stupid}`)
        }
    }
}