const fs = require("fs");
const config = require(`${process.cwd()}/config.json`);

module.exports = async (client) => {
    await require(`${process.cwd()}/handlers/handlers/${config.moduleHandler_fileName}`)(client);
    console.log(`Loaded the ${config.moduleHandler_fileName.split(".")[0]} handler.`);

    const handlers = fs.readdirSync(`${process.cwd()}/handlers/handlers/`).filter(file => file.endsWith(".js"));
    for (let file of handlers) {
        if (file == config.moduleHandler_fileName) { continue; }

        await require(`${process.cwd()}/handlers/handlers/${file}`)(client);
        console.log(`Loaded the ${file.split(".")[0]} handler.`);
    };
};