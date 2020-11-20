const { MessageEmbed } = require("discord.js");
const { defCol } = require("../../colors.json");
const emoji = require("../../emojis.json");
const config = require("../../config.json");

module.exports = {
        name: "support",
        aliases: [],
        category: "info",
        description: "Shows the support server's invite link.",
    run: async (client, message, args, lang) => {
    let error = false;
        message.channel.send(new MessageEmbed().setColor(defCol).setTitle(`${client.user.username} support`).setDescription(`${config.support_server_invite}`))
    }
}