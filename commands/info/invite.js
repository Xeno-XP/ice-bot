const { MessageEmbed } = require("discord.js");
const { defCol } = require("../../colors.json");
const emoji = require("../../emojis.json");
const config = require("../../config.json");

module.exports = {
        name: "invite",
        aliases: [],
        category: "info",
        description: "Shows the bot's invite link.",
    run: async (client, message, args, lang) => {
    let error = false;
        message.author.send(new MessageEmbed().setColor(defCol).setTitle(`${client.user.username}'s invite link`).setDescription(`${config.main_url}/add`)).catch((e) => {error = true; return message.reply("your dm's are blocked or an error occured whilst trying to send the invite link.")}).then(() => {
            if (!error) {
                message.channel.send(emoji.yes);
            }
        });
    }
}