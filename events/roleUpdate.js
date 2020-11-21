const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const discord = require("discord.js");

module.exports = (client, oldRole, newRole) => {
    let settings = db.get(`settings${oldRole.guild.id}`);

    try {
        settings.auditLog
    } catch (e) {
        if (e) {
            settings = {};
            settings.auditLog = null;

            db.set(`settings${oldRole.guild.id}`, settings);
            settings = db.get(`settings${oldRole.guild.id}`);
        };
    };

    let auditLogChannel = client.channels.cache.get(settings.auditLog);

    if (!auditLogChannel) return;

    let embed = new discord.MessageEmbed()
        .setAuthor("Role Updated")
        .setColor(newRole.hexColor)
        .addField('Old Role', `\`Name:\` ${oldRole.name}\n\`Color:\` ${oldRole.hexColor}\n\`Permissions:\` ${oldRole.permissions.toArray().join(", ").toLowerCase().replace(/_/g, " ")}`)
        .addField('New Role', `\`Name:\` ${newRole.name}\n\`Color:\` ${newRole.hexColor}\n\`Permissions:\` ${newRole.permissions.toArray().join(", ").toLowerCase().replace(/_/g, " ")}`)
        .setFooter(`ID: ${newRole.id}`)
        .setTimestamp();
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