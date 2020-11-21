const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix, ownerid } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "lock",
        usage: `lock`,
        aliases: ["lockdown"],
        category: "moderation",
        description: "Locks the current channel.",
    run: async (client, message, args, lang) => {
        
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
    if(!message.member.hasPermission('MANAGE_CHANNELS') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
      
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      
      if (!channel) channel = message.channel;
      
      message.channel.overwritePermissions([
        {
           id: message.guild.roles.everyone.id,
           deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
        },
      ]);
      
      message.channel.send(`${yes}Locked <#${channel.id}>`)
    }
}