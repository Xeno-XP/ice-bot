const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const { ownerid } = require("../../config.json")
const { defCol } = require("../../colors.json")
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports= {
        name: "avatar",
        description: "See someone's avatar image.",
        usage: `avatar | avatar <@user>`,
        category: "utility",
        aliases: ["av", "pfp", "picture"],
    run: async (client, message, args, lang) => {
        let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.author;
        
	if (!user) return message.channel.send(lang.en.general.errors.unable_to_fetch_user);
	
        let isS = "";
        if(user.username.toLowerCase().endsWith("s")) {
            isS = "'";
        } else {
            isS = "'s";
        }
    
    if (!user.displayAvatarURL({ dynamic: true })) return message.channel.send(`${no}${lang.en.general.errors.failed_to_fetch_avatar}`)
    let uEmbed = new discord.MessageEmbed()
      .setColor(defCol)
      .setAuthor(`${user.username}${isS} Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));
    message.channel.send(uEmbed);
  }
}