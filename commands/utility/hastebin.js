const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const { ownerid } = require("../../config.json")
const { defCol } = require("../../colors.json")
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const hastebin = require('hastebin-gen');

module.exports = {
        name: "hastebin",
        usage: `hastebin <code/text>`,
        category: "utility",
        aliases: ["haste"],
    run: async (client, message, args, lang) => {
      
      if(!args.join(" ")) return message.channel.send(`${lang.en.general.enter_valid_text}${angry}`);
      
      hastebin(args.join(" "), { extension: 'ice' }).then(haste => {
    message.channel.send(haste);
}).catch(error => {
    message.channel.send(`${lang.en.general.errors.default_error}${error}`);
      }); 
      }
}