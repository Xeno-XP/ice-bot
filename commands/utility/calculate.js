// const discord = require("discord.js")
// const { MessageEmbed } = require("discord.js")
// const moment = require("moment")
// const { ownerid } = require("../../config.json")
// const { defCol } = require("../../colors.json")
// const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
// const math = require('mathjs');

// module.exports= {
//         name: "calculate",
//         category: "utility",
//         aliases: ["calc"],
//     run: async (client, message, args, lang) => {
//       let equasion = args.join(" ").replace(/config/g, "");
//       equasion.replace(/config()/g, "");

//       if (!equasion) return message.channel.send(`${lang.en.general.errors.invalid_equasion}${angry}`);
      
//       let resp;
//       try {
//         resp = math.evaluate(equasion);
//       } catch (e) {
//         return message.channel.send(`${no}${e}`);
//       }
      
//       let embed = new discord.MessageEmbed()
//       .setDescription (`\`\`\`diff\n${equasion} = ${resp}\n\`\`\``)
//       .setColor(defCol);
      
//       message.channel.send(embed);
//     }
// }