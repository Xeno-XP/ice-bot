const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const config = require("../../config.json");

module.exports = {
    name: "disableCommand",
    aliases: ["disable"],
    usage: `disableCommand <command>`,
    category: "admin",
    description: "Disables a command.",
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

        // if (settings.disabledCommands.includes(command.name)) {
        //     return await message.reply(`${no} Command already disabled.`);
        // };

        // if (config.disabling_blacklisted_commands.includes(command.name)) {
        //     return await message.reply(`${no} This command is blacklisted for disabling.`);
        // };

        // settings.disabledCommands.push(command.name);
        
        // db.set(`settings${message.guild.id}`, settings);
        // await message.channel.send(`${yes} Disabled command \`${command.name}\`.`);
    }
};