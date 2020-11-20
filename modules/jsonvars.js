const fs = require("fs");
const chalk = require('chalk');
const { json } = require("body-parser");
let regex = /{{[\s\S]+.\w+}}/g;

String.prototype.between = function(prefix, suffix) {
    s = this;
    var i = s.indexOf(prefix);

    if (i >= 0) {
        s = s.substring(i + prefix.length);
    } else {
        return '';
    };

    if (suffix) {
        i = s.indexOf(suffix);
        
        if (i >= 0) {
            s = s.substring(0, i);
        } else {
            return '';
        };
    };

    return s;
};

module.exports = {
    load: false,
    parse: async (string, ...vars) => {
        for (let i = 0; i < vars.length; i++) {
            try {
                ;
            } catch (e) {
                1 + 1;
            };
        };
    }
};

async function reFormat (file) {
    fs.writeFile(file, "[]", (e) => {
        if (e) {
            throw new Error(e);
        };
    });
};

async function checkFormat (file, fileStream) {
    try {
        JSON.parse(fileStream);
    } catch (e) {
        if (e) {
            console.warn(chalk.red(`Incorrect formatting used for ${file}, reformatting file... !DATA MAY BE LOST!`));
            
            return await reFormat(file);
        };
    };

    try {
        if (JSON.stringify(JSON.parse(fileStream)) == "{}") {
            console.warn(chalk.red(`Incorrect formatting used for ${file}, reformatting file... !DATA MAY BE LOST!`));

            return await reFormat(file);
        };
    } catch (e) {
        console.warn(chalk.red(`Incorrect formatting used for ${file}, reformatting file... !DATA MAY BE LOST!`));

        return await reFormat(file);
    };

    try {
        if(!JSON.parse(fileStream).push) {
            console.warn(chalk.red(`Incorrect formatting used for ${file}, reformatting file... !DATA MAY BE LOST!`));

            return await reFormat(file);
        }
    } catch (e) {
        console.warn(chalk.red(`Incorrect formatting used for ${file}, reformatting file... !DATA MAY BE LOST!`));

        return await reFormat(file);
    }
};

function writeFile (file, obj) {
    fs.writeFile(file, JSON.stringify(obj, null, 4), (e) => {
        if (e) {
            throw new Error(e);
        };
    });
};