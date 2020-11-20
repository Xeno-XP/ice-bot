const db = require(`${process.cwd()}/modules/db.js`);
const discord = require("discord.js");

module.exports = (client, message) => {
    //sniping

    if (!message.author.bot) {
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author,
            image: message.attachments.first() ? `${message.attachments.first().proxyURL}` : null
        });
    };

    //audit log
    let settings = db.get(`settings${message.guild.id}`);
    
    try {
        settings.auditLog
    } catch (e) {
        if (e) {
            settings = {};
            settings.auditLog = null;

            db.set(`settings${message.guild.id}`, settings);
            settings = db.get(`settings${message.guild.id}`);
        };
    };

    let auditLogChannel = client.channels.cache.get(settings.auditLog);
  
    if (!auditLogChannel) return;

    let embed = new discord.MessageEmbed()
        .setAuthor(`Message Deleted`)
        .setTimestamp()
        .setColor("#f05454")
        .setDescription(`**Channel:** <#${message.channel.id}>\n**[Link for the Message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})**\n\n**Message Content:**\n${message.content}`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
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