const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const config = require("../../config.json");

module.exports = {
    name: "enableCommand",
    aliases: ["enable"],
    usage: `enableCommand <command>`,
    category: "admin",
    description: "Enables a command.",
    run: async (client, message, args, lang) => {
        return message.channel.send("This command is still in development, check back later.");
        
        // if (!message.member.hasPermission("ADMINISTRATOR")) {
        //     return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);
        // };

        // let settings = await db.get(`settings${message.guild.id}`);

        // const cmd = args.shift().toLowerCase();

        // if (cmd.length === 0) return await message.reply(`${no} No such command.`);

        // let command = client.commands.get(cmd);
        // if (!command) command = client.commands.get(client.aliases.get(cmd));

        // try {
        //     command.name;
        // } catch (e) {
        //     return await message.reply(`${no} No such command.`);
        // };

        // if (!settings.disabledCommands.includes(command.name)) {
        //     return await message.reply(`${no} Command already enabled.`);
        // };

        // settings.disabledCommands.splice(settings.disabledCommands.indexOf(command.name), 1);
        
        // db.set(`settings${message.guild.id}`, settings);
        // await message.channel.send(`${yes} Enabled command \`${command}\`.`);
    }
};