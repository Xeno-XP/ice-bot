const {
  MessageEmbed
} = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const {
  default_prefix,
  ownerid
} = require("../../config.json");
const {
  angry,
  yes,
  money,
  stupid,
  loading,
  no
} = require("../../emojis.json");
const {
  defCol
} = require("../../colors.json");

module.exports = {
  name: "poll",
  usage: `poll <poll message>`,
  category: "utility",
  description: "Create an automated server poll, with reactions.",
  run: async(client, message, args, lang) => {
      if (!message.guild.me.hasPermission("ADD_REACTIONS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
      if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
      if (!args.join(" ")) return message.channel.send(`${lang.en.general.errors.enter_a_valid_message}${angry}`);
      var embed = new MessageEmbed()
          .setTitle("Poll")
          .setDescription(args.join(" "))
          .setColor(defCol)
          .setFooter(message.author.username, message.author.displayAvatarURL())
          .setTimestamp();
      message.channel.send(embed).then(async msg => {
          let posReactions;
          let negReactions;

          await msg.react("762753908485259296");
          await msg.react("762753993196699689");


          /*const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
          };
          
          message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
              const reaction = collected.first();
          
              if (reaction.emoji.name === '👍') {
                message.reply('you reacted with a thumbs up.');
              } else {
                message.reply('you reacted with a thumbs down.');
              }
            })
            .catch(collected => {
              message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
            });*/
      });
  }
}