const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const { ownerid } = require("../../config.json")
const { defCol } = require("../../colors.json")
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const ms = require("ms");

module.exports= {
        name: "slowmode",
        description: "Change the slowmode of a channel.",
        usage: `slowmode <time in seconds>`,
        category: "utility",
        aliases: ["slow", "setslowmode", "setslow-mode", "slow-mode"],
    run: async (client, message, args, lang) => {    
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
        if(!message.member.hasPermission("MANAGE_CHANNELS") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
        if (!args[0])
          return message.channel.send(
            `${lang.en.slowmode.errors.invalid_time}${angry}`
          );

          if (isNaN(parseInt(ms(args[0])/1000)) && !args[0] == "off") return message.channel.send(`${lang.en.slowmode.errors.invalid_time}${angry}`);

          if (parseInt(ms(args[0])) > 21600000 || parseInt(ms(args[0])) < 1000) {
            if (!parseInt(ms(args[0])) == 0 && !args[0] == "off") {
              return message.channel.send(
                `${lang.en.slowmode.errors.time_out_of_range}${angry}`
              ); 
            }
          }

          if (args[0] == "off") {
            args[0] = 0;
          }

        await message.channel.setRateLimitPerUser(parseInt(ms(args[0])/1000));
        message.channel.send(
          `${yes}${lang.en.slowmode.success.set_slowmode} **${ms(parseInt(ms(args[0])), { long: true })}**.`
        );
    }
}