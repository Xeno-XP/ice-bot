const discord = require("discord.js");

const {
    MessageEmbed
} = require("discord.js");

const db = require(require("path").join(process.cwd(), `modules/db.js`));

const {
    stripIndents
} = require("common-tags");

const {
    readdirSync
} = require("fs");

const {
    default_prefix,
    ownerid
} = require("../../config.json");

const {
    defCol
} = require("../../colors.json");

const {
    no
} = require("../../emojis.json");

const {
    typeOf
} = require("mathjs");

const e = require("express");

module.exports = {

    name: "help",

    aliases: ["commands"],

    usage: `help | help <command>`,

    category: "info",

    description: "Shows all my commands.",

    example: "help google",

    run: async(client, message, args, lang) => {

        if (args[0]) {
            return getSpecificHelp(client, message, args.join(" "));
        } else {
            return getBasicHelp(client, message);
        }
    }
}

async function getBasicHelp(client, message) {
    let settings = await db.get(`settings${message.guild.id}`);
    let prefix = settings.prefix
    if (prefix == null) prefix = default_prefix;

    const embed = new discord.MessageEmbed()
    .setColor(defCol)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setAuthor(`${client.user.username} help`, client.user.displayAvatarURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())

    let cmd = "";

    const commandsSize = (category) => {
        return client.commands
            .filter(cmd => (cmd.category || "Uncategorized") === category).size;
    };

    const commands = (category) => {
        return client.commands
            .filter(cmd => (cmd.category || "Uncategorized") === category)
            .map(cmd => `\`${prefix}${cmd.name}\``)
            .join(", ") + ".";
    };

    for (const category of client.categories) {
        embed.addField(category[0].toUpperCase() + category.slice(1) + ` [${commandsSize(category)}]`, `\`${prefix}help ${category}\``, true);
    };

    return message.channel.send(embed);
}



async function getSpecificHelp(client, message, input) {
    let settings = await db.get(`settings${message.guild.id}`);
    let prefix = settings.prefix
    if (prefix == null) prefix = default_prefix;

    const commands = (category) => {
        const output = client.commands
            .filter(cmd => (cmd.category || "Uncategorized") === category)
            .map(cmd => `\`${prefix}${cmd.name}\``)
            .join(", ") + ".";

        if (output == ".") {
            return null;
        } else {
            return output;
        };
    };

    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    const cat = commands(input.toLowerCase());

    let info = `${no} No info for **${input.toLowerCase()}**`;

    if (!cmd && !cat) {
        return message.channel.send(embed.setDescription(info));
    };

    if (cmd) {
        if (cmd.category.toLowerCase() == "unlisted" && message.author.id !== ownerid) { cmd = null; };
    };

    if (cat) {
        if (cat.toLowerCase() == "unlisted" && message.author.id !== ownerid) { cat = null; };
    };

    if (!cmd && !cat) {
        return message.channel.send(embed.setDescription(info));
    };

    if (cat) {
        info = `**Category \`${input.toLowerCase()}\`:**\n`;
        info += cat;
    };

    if (cmd) {
        if (cat) {
            info += `\n\n\n**Command \`${input.toLowerCase()}\`:**\n`;
            if (cmd.name) info += `**Name**: ${cmd.name}`;
            if (cmd.description) info += `\n**Description**: ${cmd.description}`;
            if (cmd.example) info += `\n**Example**: ${cmd.example}`;
            if (cmd.usage) info += `\n**Usage**: ${cmd.usage}`;
            if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `${a}`).join(", ")}`;
        } else {
            info = `**Command \`${input.toLowerCase()}\`:**\n`;
            if (cmd.name) info += `**Name**: ${cmd.name}`;
            if (cmd.description) info += `\n**Description**: ${cmd.description}`;
            if (cmd.example) info += `\n**Example**: ${cmd.example}`;
            if (cmd.usage) info += `\n**Usage**: ${cmd.usage}`;
            if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `${a}`).join(", ")}`;
        };
    };

    return message.channel.send(embed.setColor(defCol).setDescription(info).setFooter(`For ${message.author.username}`, message.author.displayAvatarURL()).setAuthor(`${client.user.username} help`, client.user.displayAvatarURL()).setTimestamp());
}