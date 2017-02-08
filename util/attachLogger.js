const chalk = require("chalk");
const moment = require("moment");

module.exports = client => {
  client.log = (...args) => console.log(chalk.green.bold(`[LOG] [${moment().format("MMM DD HH:mm:ss")}]`), ...args);
  client.error = (...args) => console.log(chalk.bgRed.white.bold(`[ERR] [${moment().format("MMM DD HH:mm:ss")}]`), ...args);
  client.warn = (...args) => console.log(chalk.bgYellow.white.bold(`[WRN] [${moment().format("MMM DD HH:mm:ss")}]`), ...args);
};
