const fs = require("fs")
const ascii = require("ascii-table");

let table = new ascii("Events");
table.setHeading("Event", "Status");

module.exports = (client) => {
    fs.readdir(`${process.cwd()}/events/`, (_err, files) => {
        files.forEach((file) => {
            if (!file.endsWith(".js")) return;
            const event = require(`${process.cwd()}/events/${file}`);
            let eventName = file.split(".")[0];
            if (eventName) {
                table.addRow(file, '✓ READY');
            } else {
                table.addRow(file, 'X ERROR');
            }
            try {
                client.on(eventName, event.bind(null, client));
            } catch (e) { e.stack }
            delete require.cache[require.resolve(`${process.cwd()}/events/${file}`)];
        });
        console.log(table.toString());
    });
};