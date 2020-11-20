const discord = require("discord.js");
const {
    MessageEmbed
} = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
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
    angry,
    yes,
    money,
    stupid,
    loading,
    no
} = require("../../emojis.json");

module.exports = {
    name: "purge",
    aliases: ["clean", "clear"],
    usage: `purge <number of messages (1+ messages)>`,
    category: "moderation",
    description: "Purges multiple messages with ease.",
    run: async(client, message, args, lang) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
        let numMessages = parseInt(args[0])

        if (numMessages < 1) {
            return message.channel.send({
                embed: {
                    description: "You must select a **valid amount** of messages to delete!\n```d\npurge <number of messages (1+ messages)>\n```",
                    color: 16711680,
                    thumbnail: {
                        url: "https://i.postimg.cc/pXv5bh2t/1603-Animated-Cross-2.gif"
                    }
                }
            });
        };

        await message.delete();

        message.channel.bulkDelete(numMessages).then(() => {
            message.channel.send({
                "embed": {
                    "title": "Success!",
                    "description": `**Info:**\n <:deleted_messages:741633981841276950> Deleted Messages: **${numMessages}**\n\n*This message will self destruct after 2 seconds*`,
                    "color": 4062976,
                    "footer": {
                        "text": message.client.default_footer
                    },
                    "thumbnail": {
                        "url": "https://i.postimg.cc/Yqd3rGtT/6093-Animated-Checkmark-1.gif"
                    }
                }
            }).then((m) => {
                setTimeout(() => {
                    m.delete()
                }, 2000)
            })
        });

        for (let i = 0; i < Math.floor(numMessages / 100); i++) {
            await message.channel.bulkDelete(100);
        };

        await message.channel.bulkDelete(numMessages % 100).then(() => {
            message.channel.send({
                "embed": {
                    "title": "Success!",
                    "description": `**Info:**\n <:deleted_messages:741633981841276950> Deleted Messages: **${numMessages}**\n\n*This message will self destruct after 2 seconds*`,
                    "color": 4062976,
                    "thumbnail": {
                        "url": "https://i.postimg.cc/Yqd3rGtT/6093-Animated-Checkmark-1.gif"
                    }
                }
            }).then((m) => {
                setTimeout(() => {
                    m.delete()
                }, 2000)
            })
        });
    }
};