const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix, ownerid } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "clearinfractions",
        usage: `clearinfractions <@user>`,
        category: "moderation",
        aliases: ["clearwarns", "clearwarnings"],
        description: "Clears a person's infractions.",
    run: async (client, message, args, lang) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)

  let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]);
  if(!user) {
    return message.channel.send(lang.en.general.errors.invalid_mentioned_user + angry);
  }

  let warns = db.get(`warns${message.guild.id}${user.id}`);
  
    let hasWarns;
   
    if (!warns) {
      hasWarns = false;
    } else {
      hasWarns = true;
    };
    
    if (!hasWarns) {
      return message.channel.send(`This person doesn't have any infractions!${stupid}`);
    } else {
      db.delete(`warns${message.guild.id}${user.id}`);
    };
    
      let embed = new discord.MessageEmbed()
        .setAuthor(`Cleared ${user.tag}'s infractions`, user.displayAvatarURL({ dynamic: true }))
        .setColor(0x2D2D2D);
              
    message.channel.send(embed);
    }
}