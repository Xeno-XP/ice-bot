const { MessageEmbed } = require("discord.js");
const { defCol } = require("../../colors.json");
const emoji = require("../../emojis.json");
const config = require("../../config.json");

module.exports = {
        name: "dashboard",
        aliases: ["dash"],
        category: "info",
        description: "Shows the server's dashboard link.",
    run: async (client, message, args, lang) => {
    let error = false;
        message.channel.send(new MessageEmbed().setColor(defCol).setTitle(`${message.guild.name}'s dashboard.`).setDescription(`${config.main_url}/manage/${message.guild.id}`))
    }
}