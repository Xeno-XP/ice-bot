const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
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
        .setAuthor("Role Created")
        .setColor("#52f041")
        .setDescription(`${role.name} [<@&${role.id}>]\nPermissions: ${role.permissions.toArray().join(", ").toLowerCase().replace(/_/g, " ")}`)
        .setTimestamp(role.createdTimestamp);
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