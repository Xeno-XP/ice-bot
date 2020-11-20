let fs = require("fs");
let chalk = require('chalk');
let { json } = require("body-parser");
let path = require("path");
let { id } = require("common-tags");
let file = "./storage/db.json";
let fileReq = require("path").join(process.cwd(), "storage/db.json");

module.exports = {
    set: (ID, value) => {
        let fileStream = fs.readFileSync(file, { encoding:'utf8', flag:'r' });

        checkFormat(file, fileStream);

        let obj = require(fileReq);

        let found = null;

        for (let i = 0; i < obj.length; i++) {
            if (obj[i].ID == ID) {
                found = obj[i].row;
            };

            if (found) {
                obj.splice(i, 1);           
            }
        };

        obj.push({
            ID: ID,
            row: value
        });

        update(file, obj);
    },
    get: (ID) => {
        let fileStream = fs.readFileSync(file, { encoding:'utf8', flag:'r' });

        checkFormat(file, fileStream);

        let obj = require(fileReq);

        let found = null;

        for (let i = 0; i < obj.length; i++) {
            if (obj[i].ID == ID) {
                found = obj[i].row;
            };
        };

        return found;
    },
    getAll: () => {
        let fileStream = fs.readFileSync(file, { encoding:'utf8', flag:'r' });

        checkFormat(file, fileStream);

        let obj = require(fileReq);

        return obj;
    },
    delete: (ID) => {
        let fileStream = fs.readFileSync(file, { encoding:'utf8', flag:'r' });

        checkFormat(file, fileStream);

        let obj = require(fileReq);

        for (let i = 0; i < obj.length; i++) {
            if (obj[i].ID == ID) {
                obj.splice(i, 1);
            };
        };

        update(file, obj);
    },
    update: () => {
        let fileStream = fs.readFileSync(file, { encoding:'utf8', flag:'r' });

        checkFormat(file, fileStream);

        let obj = require(fileReq);

        update(file, obj);
    }
}

async function reFormat (file) {
    fs.writeFile(file, "[]", (e) => {
        if (e) {
            throw new Error(e);
        };
    });
};

async function checkFormat (file, fileStream) {
    return
    /*try {
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
    }*/
};

function writeFile (file, obj) {
    fs.writeFile(file, JSON.stringify(obj, null, 4), (e) => {
        if (e) {
            throw new Error(e);
        };
    });
};

async function autoUpdate (file, obj) {
    setInterval(() => {
        fs.writeFile(file, JSON.stringify(obj, null, 4), (e) => {
            if (e) {
                throw new Error(e);
            };
        });
    }, 1000);
};

async function update (file, obj) {
    fs.writeFile(file, JSON.stringify(obj, null, 4), (e) => {
        if (e) {
            throw new Error(e);
        };
    });
};