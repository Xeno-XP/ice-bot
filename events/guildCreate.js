const Discord = require("discord.js");
const moment = require("moment");
const config = require(`${process.cwd()}/config.json`);

module.exports = async (client, guild) => {
	let channel = client.channels.cache.get(config.bot_logs);
    
    if (!channel) {
        return;
    };

    let embed = new Discord.MessageEmbed();
        embed.setTitle("New server!");
        embed.addField("Owner", `${client.users.cache.get(guild.owner.id).tag ? client.users.cache.get(guild.owner.id).tag : "Failed to fetch owner."} (<@${guild.owner.id}>)`, true);
        embed.addField("Boosts", guild.premiumSubscriptionCount || '0', true);
        embed.addField("Members", `📦Total: ${guild.memberCount}\n🧑Humans: ${guild.members.cache.filter(m => !m.user.bot).size}\n🤖Bots: ${guild.members.cache.filter(m => m.user.bot === true).size}`, true);
        embed.addField("Channels", `📦Total: ${guild.channels.cache.size}\n#️⃣Text: ${guild.channels.cache.filter(c => c.type === 'text').size}\n🔊Voice: ${guild.channels.cache.filter(c => c.type === 'voice').size}`, true);
        embed.addField("Roles", `📦Total: ${guild.roles.cache.size}`, true);
        embed.addField("Created At", `${moment(guild.createdTimestamp).format('LT')} ${moment(guild.createdTimestamp).format('LL')} (${moment(guild.createdTimestamp).fromNow()})`, true);
        embed.setColor(0x15d63b);
        embed.setFooter(guild.name, guild.iconURL({ dynamic: true }));

    try {
        channel.send(embed);
    } catch (e) {
        if (e) {
            return 1 + 1;
        } else {
            return 1 + 1;
        };
    };
};