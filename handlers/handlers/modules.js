const fs = require("fs");
const config = require(`${process.cwd()}/config.json`);

module.exports = (client) => {
    require(`${process.cwd()}/modules/${config.constructorLoader_fileName}`).init(client);

    fs.readdir(`${process.cwd()}/modules/`, (_err, files) => {
        
        files.forEach((file) => {
            if (!file.endsWith(".js") || file == config.constructorLoader_fileName) return;

            const module = require(`${process.cwd()}/modules/${file}`);

            try {
                module.init(client);
            } catch (e) { e.stack; };
            delete require.cache[require.resolve(`${process.cwd()}/modules/${file}`)];
        });
    });
};