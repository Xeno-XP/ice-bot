const { MessageEmbed } = require("discord.js");
const { defCol } = require("../../colors.json");

module.exports = {
        name: "ping",
        aliases: ["pong"],
        category: "info",
        description: "Shows the bot's ping.",
    run: async (client, message, args, lang) => {
      message.channel.send({
        embed: {
            "title": "Pinging...",
            "description": "<a:loading:735266475652153368>",
            "color": 2105893
        }
    }).then((sentMessage) => {
        let ping = Math.floor((sentMessage.createdTimestamp - message.createdTimestamp) / 2);

        sentMessage.edit({
            embed: {
                "description": `**Total** Latency: \`${Math.floor(client.ws.ping) + ping}\`\n\n**${client.user.username}** Latency: \`${ping}\`\n**API** Latency: \`${Math.floor(client.ws.ping)}\``,
                "color": 65433
            }
        })
    })

  }
}