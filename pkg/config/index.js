const fs = require("fs")

const CONFIG_SOURCE = `${__dirname}/../../config.json`

let config = null;

if (config === null){
    const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
    config = JSON.parse(file)
}

const getSection = (section) => {
    if(!config[section]) {
        throe `Configuration section ${section} does not exist!`
    }
    return config[section];
}

module.exports = {
    getSection
}