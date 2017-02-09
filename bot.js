// Disable listener limit
require("events").EventEmitter.prototype._maxListeners = 0;

// Client initialization
const Discord = require("discord.js");
const client = new Discord.Client({
  autoReconnect: true,
  disableEveryone: true,
  fetchAllMembers: true,
  disabledEvents: [
    "TYPING_START",
    "TYPING_STOP",
    "FRIEND_ADD",
    "FRIEND_REMOVE"
  ]
});

// Things to be attached to client
client.config = require("./config.json");

require("./util/attachLogger.js")(client);
require("./util/loadAssets.js")(client);

client.util = {
  isStaff: require("./util/isStaff.js")
};

require("./util/loadEvents.js")(client);

client.login(client.config.token);

process.on("unhandledRejection", reason => client.error(reason));