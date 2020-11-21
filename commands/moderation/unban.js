const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix, ownerid } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "unban",
        usage: `unban <user ID> <reason>`,
        category: "moderation",
        description: "Unbans a user from the server by ID.",
    run: async (client, message, args, lang) => {

      if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) { return message.channel.send({
        embed: {
        "title": "Error",
        "description": lang.en.general.errors.user_no_permission,
        "color": 15794176,
        "timestamp": new Date(),
        "thumbnail": {
        "url": "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
        }
        }}) }

if (!message.guild.member(message.client.user).hasPermission('BAN_MEMBERS')) { return message.channel.send({
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
    if(reason == undefined || reason == " "){
        reason = lang.en.general.errors.no_reason_provided
    }
let banMember = message.guild.member(client.users.cache.get(args[0]));

    setTimeout(() => {
        message.guild.members.unban(args[0]).then((member) => {
            message.channel.send({
            embed: {
                    "color": 717056,
                "timestamp": new Date(),
                    "thumbnail": {
                        "url": "https://i.postimg.cc/Yqd3rGtT/6093-Animated-Checkmark-1.gif"
                    }
                }
            });
        }).catch(err => {
            if(err.message === 'Unknown Ban'){
                message.channel.send({embed: {
                      title: "Error:",
                      description: lang.en.bans.errors.user_not_banned,
                      color: 16056320,
                      "timestamp": new Date(),
                      thumbnail: {
                        url: "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
                      }
                    }})
            } else {
            message.channel.send({embed: {
      title: "Error:",
      description: "An unknown error has occurred this is most likely due to you **not putting a valid user id**!",
      color: 16056320,
      "timestamp": new Date(),
      thumbnail: {
        url: "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
      }}
        })}
        })
    }, 500)

  }
}