const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Status");

module.exports = (client) => {
    readdirSync(`${process.cwd()}/commands/`).forEach(dir => {
        const commands = readdirSync(`${process.cwd()}/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`${process.cwd()}/commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✓ READY');
            } else {
                table.addRow(file, 'X ERROR');
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}