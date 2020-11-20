const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix, ownerid } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const config = require("../../config.json");

module.exports = {
        name: "infractions",
        usage: `infractions [@user]`,
        aliases: ["warns", "warnings"],
        category: "moderation",
        description: "Shows a person's infractions.",
    run: async (client, message, args, lang) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)

  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  let warns = db.get(`warns${message.guild.id}${user.id}`);
    let lastThreeWarns = "";
    let hasWarns;
   
    if (!warns) {
      hasWarns = false;
    } else {
      hasWarns = true;
    };
    
    if (hasWarns) {
      for (let i = 0; i < 5; i++) {
        if (warns[warns.length-i]) {
          lastThreeWarns += `**${i}. **` + warns[warns.length-i] + "\n";
        }
      }
    } else {
      lastThreeWarns = "None.";
    };
    
      let embed = new discord.MessageEmbed()
        .setAuthor(`${user.tag}'s infractions`, user.displayAvatarURL({ dynamic: true }))
        .setColor(defCol)
        .setTimestamp()
        .addField(`**Total infractions:**`, warns ? warns.length : "0", false)
        .addField("**Last 5 infractions:**", `${warns ? `${lastThreeWarns}\n[\`[remove all infractions]\`](${config.main_url}/manage/${message.guild.id}/clearinfractions/${user.id})` : "None."}`, false)
              
    message.channel.send(embed);
    }
}