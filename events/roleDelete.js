const db = require(`${process.cwd()}/modules/db.js`);
const discord = require("discord.js");

module.exports = (client, role) => {
    let settings = db.get(`settings${role.guild.id}`);

    try {
        settings.auditLog
    } catch (e) {
        if (e) {
            settings = {};
            settings.auditLog = null;

            db.set(`settings${role.guild.id}`, settings);
            settings = db.get(`settings${role.guild.id}`);
        };
    };

    let auditLogChannel = client.channels.cache.get(settings.auditLog);

    if (!auditLogChannel) return;

    let embed = new discord.MessageEmbed()
        .setAuthor("Role Deleted")
        .setColor("#f05454")
        .setDescription(`${role.name} [${role.id}]\nPermissions: ${role.permissions.toArray().join(", ").toLowerCase().replace(/_/g, " ")}`)
        .setTimestamp(role.deletedTimestamp);
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