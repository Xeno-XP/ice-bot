const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const { set } = require("../../modules/db");

module.exports = {
    name: "setLogs",
    usage: `setLogs <channel>`,
    aliases: ["logs", "setlogs"],
    category: "modules & plugins",
    description: "Setup a Logs Channel",
    run: async (client, message, args, lang) => {
    if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
    if(!message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)

    let settings = db.get(`settings${message.guild.id}`);

        if (settings.auditLog) return message.channel.send(`${lang.en.logs.errors.already_has_channel}${stupid}`);
        
    let channel = message.mentions.channels.first();
      
    if (!channel) {
        return message.channel.send(
            `${lang.en.channels.errors.select_a_valid_channel}${angry}`
        );
    }

    settings.auditLog = channel.id;

    db.set(`settings${message.guild.id}`, settings)
        message.channel.send(`${yes}${lang.en.general.success.set_channel} \`${channel.name.replace(/-/g, " ")}\``);
    }
}