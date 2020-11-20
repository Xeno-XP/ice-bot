const pidusage = require('pidusage')
const os = require('os');
const Discord = require("discord.js");
const { defCol } = require("../../colors.json");

module.exports = {
        name: "performance",
        category: "info",
        aliases: [],
        description: "Shows the internal usage.",
    run: async (client, message, args, lang) => {
        const stats = await pidusage(process.pid);

        message.channel.send(
            new Discord.MessageEmbed()
                .setColor(defCol)
                .addField("**Ram**", `${Math.floor(os.freemem()/10000000)/100}GB/${Math.floor(os.totalmem()/10000000)/100}GB`, true)
                .addField("**Cpu**", `${Math.floor(stats.cpu*100)/100}%`, true)
        );
    }
}