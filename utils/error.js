module.exports = async (client) => {
    const logger = require('./logger'); //better console logging
    const chId = require(`${process.cwd()}/config.json`).vital_logs;
    const nodeMajorVersion = parseInt(process.versions.node.split('.')[0, 10]); //get the node version
    
    if (nodeMajorVersion < 10) { //this bot only works with a version 10 of node/higher so stop running if this is case
        logger.warn('This is an unsupported NODE.JS version. Please install and use NODE.JS 10 or newer');
        process.exit(1);
    }
    
    const { accessSync } = require("fs");
    const path = require("path");
    
    try {
        accessSync(path.join(__dirname, '..', 'node_modules')); //see if node_modules folder exists
    } catch (e) {
        logger.warn('Please run npm install before starting the bot, the node_modules directory was not found.');
        process.exit(1);
    }
    process.on("uncaughtException", err => { //error handling
        logger.error(err);
        logger.sendLog(err, "Error", client.channels.cache.get(chId));
    });
    
    process.on('unhandledRejection', (reason, promise) => {
        logger.warn(reason);
        logger.sendLog(reason, "Warn", client.channels.cache.get(chId));
    });
    
    try {
        const packageJson = require("../package.json");
        const modules = Object.keys(packageJson.dependencies);
        //these are the names of all the modules
        modules.forEach(mod => {
            accessSync(path.join(__dirname, '..', 'node_modules', mod));
        });
    } catch (e) {
        logger.warn("It appears you have a missing package, do npm install.");
        process.exit(1);
    }
    
    logger.info("You have all required modules installed, proceeding to start bot!");
};