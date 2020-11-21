const discord = require("discord.js");
const {
    MessageEmbed
} = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const {
    stripIndents
} = require("common-tags");
const fs = require("fs");
const {
    default_prefix,
    ownerid
} = require("../../config.json");
const {
    defCol
} = require("../../colors.json");
const emoji = require("../../emojis.json")
const ms = require("ms");
const randomColor = require("randomcolor"); 
const { measureMemory } = require("vm");

module.exports = {
    name: "start",
    category: "giveaway",
    aliases: [],
    description: "Creates a giveaway.",
    cooldown: 15,
    run: async(client, message, args, lang) => {
        let hasGiveawaysRole = true;

        try {
            message.guild.roles.cache.find(r => r.name.toLowerCase().includes("giveaways")).id;
        } catch (e) {
            if (e) {
                hasGiveawaysRole = false;
            };
        };

        if(!message.member.hasPermission("MANAGE_MESSAGES") &&
            !message.member.hasPermission("ADMINISTRATOR") &&
            !message.member.roles.cache.has(hasGiveawaysRole ? message.guild.roles.cache.find(r => r.name.toLowerCase().includes("giveaways")).id : "")) return message.channel.send(`${lang.en.general.errors.user_no_permission} Nor the \`Giveaways\` role.${emoji.angry}`);

        if (!args[0]) return message.channel.send(`You did not specify your time!`);
        if (!args[0].endsWith("d") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("m") &&
            !args[0].endsWith("s")
        )
            return message.channel.send(
                `You did not use the correct formatting for the time!`
            );
        if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);
        let channel = message.mentions.channels.first();
        if (!channel)
            return message.channel.send(
                `I could not find that channel in the guild!`
            );
        let prize = args.slice(2).join(" ");
        if (!prize) return message.channel.send(`No prize specified!`);

        if (ms(args[0]) > 1814400000) {
            return message.channel.send("You exceeded the maximum giveaway time.");
        };

        let stor = require("../../storage/giveaways.json");

        message.channel.send(`*Giveaway created in ${channel}*`);

        const embColor = randomColor({
            luminosity: 'bright',
            format: 'hex'
        });

        let isEnded = false;

        let Embed = new MessageEmbed()
            .setTitle(prize)
            .setDescription(
                `React with ${emoji.tada} to enter!\n` +
                `Time remaning: **${ms(ms(args[0]), { long: true })}**\n` +
                `Hosted by: ${message.author}`
            )
            .setFooter("Ends at")
            .setTimestamp(Date.now() + ms(args[0]))
            .setColor(embColor);

        let m = await channel.send(`🎉🎉 GIVEAWAY 🎉🎉`, Embed);

        stor.push({
            id: m.id,
            endsAt: Date.now() + ms(args[0]),
            channel: m.channel.id,
            prize: prize,
            host: message.author.id,
            isEnded: false,
            forReroll: false
        });

        let giveawayIndex = stor.length - 1;

        m.react("731860738834038784");

        client.modules.writeData(JSON.stringify(stor, null, 4));

        setInterval(() => {
            stor = require("../../storage/giveaways.json");

            if (stor[giveawayIndex].isEnded) {
                isEnded = true;
            };
        }, 300);

        let alreadyEnded = false;

        setInterval(() => {
            if (stor[giveawayIndex].forReroll) {
                stor[giveawayIndex].forReroll = false;
                client.modules.writeData(JSON.stringify(stor, null, 4));
            
                if (m.reactions.cache.get("731860738834038784").count <= 1) {
                    isEnded = true;
                    m.edit(Embed.setDescription(
                        `Winner: No one.\n` +
                        `Hosted by: ${message.author}`
                    ).setColor(0x202225).setFooter("Ended at"));
                    return message.channel.send(
                        `Not enough people reacted to draw a winner!`
                    );
                }

                let winner = m.reactions.cache
                    .get("731860738834038784")
                    .users.cache.filter((u) => !u.bot)
                    .random();
                channel.send(
                    `Congratulations, ${winner}! You won the **${prize}**!`
                );

                m.edit(Embed.setDescription(
                    `Winner: ${winner}\n` +
                    `Hosted by: ${message.author}`
                ).setColor(0x202225).setFooter("Ended at"));
            };
        }, 300);

        setInterval(() => {
            if (isEnded && !alreadyEnded) {
                stor = require("../../storage/giveaways.json");

                alreadyEnded = true;

                stor[giveawayIndex].isEnded = true;
                client.modules.writeData(JSON.stringify(stor, null, 4));

                if (m.reactions.cache.get("731860738834038784").count <= 1) {
                    isEnded = true;
                    m.edit(Embed.setDescription(
                        `Winner: No one.\n` +
                        `Hosted by: ${message.author}`
                    ).setColor(0x202225).setFooter("Ended at"));
                    return message.channel.send(
                        `Not enough people reacted to draw a winner!`
                    );
                }

                let winner = m.reactions.cache
                    .get("731860738834038784")
                    .users.cache.filter((u) => !u.bot)
                    .random();
                channel.send(
                    `Congratulations, ${winner}! You won the **${prize}**!`
                );

                m.edit(Embed.setDescription(
                    `Winner: ${winner}\n` +
                    `Hosted by: ${message.author}`
                ).setColor(0x202225).setFooter("Ended at"));

                isEnded = true;
            };
        }, 300);

        setTimeout(() => {
            isEnded = true;
        }, ms(args[0]));

        let secondsPassed = 0;

        setInterval(() => {
            if (!isEnded) {
                m.edit(Embed.setDescription(
                    `React with ${emoji.tada} to enter!\n` +
                    `Time remaning: **${ms(ms(args[0])-secondsPassed*1000, { long: true })}**\n` +
                    `Hosted by: ${message.author}`
                ));
            } else {
                return;
            }
        }, 3000)

        setInterval(() => {
            if (!isEnded) {
                secondsPassed++;
            } else {
                return;
            };
        }, 1000);
    }
}