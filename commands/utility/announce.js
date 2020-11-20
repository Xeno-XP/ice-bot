const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "announce",
        usage: "announce [tag everyone? : true, false] <#announcements-channel> <Message>",
        category: "utility",
        description: "Brodcast server news.",
    run: async (client, message, args, lang) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);
      
      function getChannelIdFromMention(b){
        let a;try{a=b.split("<#");a=a.slice(1);a=a[0].split(">");}catch(e){if(e){return null;}};return a[0];
      };

        let tag = args[0];

        if (tag !== "false" && tag !== "true") {
            tag = "false";
        } else {
            args.shift();
        };

        let channel = client.channels.cache.get(getChannelIdFromMention(args[0]));

        if(!channel) return message.channel.send(`${lang.en.channels.errors.select_a_valid_channel}${angry}`)
          let channelIndex = args.indexOf("<#"+channel.id+">", 0);
          if(!args.slice(channelIndex+1).join(" ")){
            return message.channel.send(`${lang.en.general.errors.enter_a_valid_message}${angry}`)
          }

        let announcementEmbed = new MessageEmbed()
          .setTitle("Announcement")
          .setColor("RANDOM")
          .setDescription(args.slice(channelIndex+1).join(" "))
          .setFooter(`From ${message.author.tag}`, message.author.displayAvatarURL())
          .setTimestamp();

        channel.send(`${tag === "true" ? "@everyone" : ""}`, {embed: announcementEmbed});
    }
};