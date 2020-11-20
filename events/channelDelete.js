const db = require(`${process.cwd()}/modules/db.js`);
const discord = require("discord.js");

module.exports = (client, channel) => {
    let settings = db.get(`settings${channel.guild.id}`);

    try {
        settings.auditLog
    } catch (e) {
        if (e) {
            settings = {};
            settings.auditLog = null;

            db.set(`settings${channel.guild.id}`, settings);
            settings = db.get(`settings${channel.guild.id}`);
        };
    };

    let auditLogChannel = client.channels.cache.get(settings.auditLog);

    if (!auditLogChannel) return;

    let embed = new discord.MessageEmbed()
        .setAuthor("Channel Deleted")
        .setColor("#f05454")
        .setDescription(`${channel.name} [${channel.id}]`);
        try {
            auditLogChannel.send(embed);
        } catch (e) {
            if (e) {
                return 1+1;
            } else {
                return 1+1;
            };
        };
}