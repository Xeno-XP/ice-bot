const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix, ownerid } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "kick",
        usage: `kick <@user> {reason}`,
        category: "moderation",
        description: "Kicks a selected user from the server.",
    run: async (client, message, args, lang) => {
      if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) { return message.channel.send({
        embed: {
        "title": "Error",
        "description": lang.en.general.errors.user_no_permission,
        "color": 15794176,
            "timestamp": new Date(),
        "thumbnail": {
        "url": "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
        }
        }}) }

if (!message.guild.member(message.client.user).hasPermission('KICK_MEMBERS')) { return message.channel.send({
        embed: {
        "title": "Error",
        "description": lang.en.general.errors.bot_no_permission,
        "color": 15794176,
            "timestamp": new Date(),
        "thumbnail": {
        "url": "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
        }
        }}) }
    let args2 = message.content.split(' ').slice(2);
    let reason = args2.join(" ")
    if(reason === undefined || reason === "" || reason === " "){
        reason = lang.en.general.errors.no_reason_provided
    }
if (message.mentions.users.size === 0) { return message.channel.send({
        embed: {
        "title": "Error",
        "description": lang.en.general.errors.invalid_mentioned_user,
        "color": 15794176,
            "timestamp": new Date(),
        "thumbnail": {
        "url": "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
        }
        }}) }
let banMember = message.guild.member(message.mentions.users.first());
if (!banMember) { return message.channel.send({
        embed: {
        "title": "Error",
        "description": lang.en.general.errors.user_not_found,
        "color": 15794176,
            "timestamp": new Date(),
        "thumbnail": {
        "url": "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
        }
        }}) }
        
    const bannedMemberEmbed = new Discord.MessageEmbed()
        .setColor('#fc2d2d')
        .setTitle(`You have been kicked from ${message.guild.name}`)
        .setDescription(`Reason: **${reason}**\nKicked by: **${message.author.username}#${message.author.discriminator}**`)
        .setTimestamp()
        .setTimestamp();
    
        banMember.send(bannedMemberEmbed);
    setTimeout(() => {
        
        banMember.kick().then((member) => {
            message.channel.send({
            embed: {
                    "title": `Successful kick!`,
                    "description": `**Info:**\nReason: **${reason}**\nIssuer: **${banMember.user.username}#${banMember.user.discriminator}**\nExecutor: **${message.author.username}#${message.author.discriminator}**`,
                    "color": 717056,
                "timestamp": new Date(),
                    "thumbnail": {
                        "url": "https://i.postimg.cc/Yqd3rGtT/6093-Animated-Checkmark-1.gif"
                    }
                }
            });
        }).catch(error => {
            message.channel.send({embed:{
  "title": "Error",
  "description": lang.en.general.errors.bot_no_permission,
  "color": 16711680,
  "timestamp": new Date(),
  "thumbnail": {
    "url": "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
  }
}})
            return
        })
    }, 500)
}
}