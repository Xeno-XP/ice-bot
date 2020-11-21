const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const {
    default_prefix,
    ownerid,
    owner_channel
} = require("../config.json");
const discord = require("discord.js");
const {
    angry,
    yes,
    money,
    stupid,
    loading,
    no
} = require("../emojis.json");
const {
    defCol
} = require("../colors.json");
const cooldowns = new discord.Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const checkSettings = async(settings, guild, client) => {
    let invalidSetting = false;

    if (JSON.stringify(settings) == "{}") {
        await db.set(`settings${message.guild.id}`, new client.guildSettings());
        settings = await db.get(`settings${message.guild.id}`);
    };

    if (typeof settings !== "object" || settings == null) {
        return await db.set(`settings${guild.id}`, new client.guildSettings());
    };

    try {
        settings.prefix;
    } catch (e) {
        if (e) {
            invalidSetting = true;
            settings.prefix = null;
        };
    };

    try {
        settings.language;
    } catch (e) {
        if (e) {
            invalidSetting = true;
            settings.language = null;
        };
    };

    try {
        settings.disabledCommands;
        settings.disabledCommands.includes("");
    } catch (e) {
        if (e) {
            invalidSetting = true;
            settings.disabledCommands = [];
        };
    };

    try {
        settings.welcomeChannel;
    } catch (e) {
        if (e) {
            invalidSetting = true;
            settings.welcomeChannel = null;
        };
    };

    try {
        settings.premiumStatus;
    } catch (e) {
        if (e) {
            invalidSetting = true;
            settings.premiumStatus = null;
        };
    };

    try {
        settings.premiumStartedAt;
    } catch (e) {
        if (e) {
            invalidSetting = true;
            settings.premiumStartedAt = null;
        };
    };

    try {
        settings.premiumEndsAt;
    } catch (e) {
        if (e) {
            invalidSetting = true;
            settings.premiumEndsAt = null;
        };
    };

    try {
        settings.autoMod;
    } catch (e) {
        if (e) {
            invalidSetting = true;
            settings.autoMod = false;
        };
    };

    if (invalidSetting) {
        await db.set(`settings${guild.id}`, settings);
    };
};

module.exports = async(client, message) => {
    //init
    let settings = await db.get(`settings${message.guild.id}`);
    checkSettings(settings, message.guild, client);
    settings = await db.get(`settings${message.guild.id}`);

    let lang, language;

    if (!settings.language) {
        language = "en";
    } else {
        language = settings.language;
    };

    lang = require(`${process.cwd()}/language/en.json`);

    //auto-mod
    if (client.modules.is_url(message.content) === true) {
        try {
            message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]);
        } catch (e) {
            if (e) {
                return;
            };
        };

        if (message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return;
        if (settings.autoMod) {
            await message.delete();
            await message.reply(`${lang.en.automod.messages.sent_link}${angry}`).then(async m => {
                setInterval(async() => {
                    await m.delete()
                }, 2000)
            });
            await message.author.send(`**${lang.en.automod.messages.dm_conformation} ${message.guild.name}**${angry}`);
        }
    }

    //commands
    let prefix = settings.prefix;

    if (!prefix) {
        prefix = default_prefix;
    };

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        let embed = new discord.MessageEmbed()
            .setColor(defCol)
            .setDescription(`My Prefix in this server is \`${prefix}\`\nUse \`${prefix}help\``);
        return message.channel.send(embed);
    }

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

    if (message.author.bot) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return await message.react("762753993196699689");

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    try {
        command.name;
    } catch (e) {
        return await message.react("762753993196699689");
    };

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime && message.author.id !== ownerid) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `you need to wait ${timeLeft.toFixed(1)} more second(s) before re-executing the \`${command.name}\` command.`
            );
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (command) {
        if (command.category.toLowerCase() == "unlisted" && message.author.id !== ownerid) {
            return await message.react("762753993196699689").catch(console.error);
        };

        try {
            if (settings.disabledCommands.includes(command.name)) {
                return message.reply("This command is disabled in this server.")
            } else {
                let regusers = await db.get("registeredusers");

                if (!regusers) {
                    await db.set("registeredusers", []);
                    regusers = await db.get("registeredusers");
                };

                try {
                    regusers;
                } catch (e) {
                    if (e) {
                        await db.set("registeredusers", []);
                        regusers = await db.get("registeredusers");
                    };
                };

                if (regusers == null) {
                    return command.run(client, message, args, require(`${process.cwd()}/language/en.json`), client.modules);
                };

                if (!regusers.includes(message.author.id)) {
                    const tosembed = new discord.MessageEmbed()
                        .setTitle(`Welcome to ${client.user.username}!`)
                        .setDescription(`By clicking ${yes} you agree to the bot's **Terms of Service** listed **__[here](${client.config.main_url}/legal#terms)__**.`)
                        .setFooter(message.author.username, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setColor(0x00ffeb);

                    const tosmsg = await message.channel.send(tosembed);

                    try {
                        await tosmsg.react("762753908485259296");
                    } catch (error) {
                        console.error(error);
                    };

                    const filter = async(reaction, user) => user.id !== message.client.user.id;
                    var collector = tosmsg.createReactionCollector(filter, {
                        time: 60000
                    });

                    collector.on("collect", async(reaction, user) => {
                        reaction.users.remove(user).catch(console.error);

                        switch (reaction.emoji.id) {
                            case "762753908485259296":
                                await tosmsg.reactions.removeAll().catch(1 + 1);
                                await tosmsg.edit(tosembed.setColor(0x202225).setDescription(`${yes} Accepted.`).setTitle(""));
                                regusers = await db.get("registeredusers");
                                regusers.push(message.author.id);
                                db.set("registeredusers", regusers);
                                command.run(client, message, args, lang, client.modules);
                                break;
                        };
                    });

                    collector.on("end", async() => {
                        await tosmsg.reactions.removeAll().catch(1 + 1);
                        await tosmsg.delete();
                    });
                } else {
                    if (!settings.disabledCommands.includes(command.name)) {
                        command.run(client, message, args, lang, client.modules);
                    } else {
                        await message.react("762753993196699689");
                        await message.reply("This command is disabled in this guild.");
                    };
                };
            }
        } catch (error) {
            console.error(error);
            return await message.react("762753993196699689").catch(console.error);
        };
    };
};