// Disable listener limit
require("events").EventEmitter.prototype._maxListeners = 0;

// Client initialization
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true,
  disabledEvents: [
    "TYPING_START",
    "RELATIONSHIP_ADD",
    "RELATIONSHIP_REMOVE"
  ]
});

// Things to be attached to client
client.config = require("./config.json");

client.util = {
  // Any util methods go in here
  stripIndents: require("common-tags").stripIndents
};

require("./util/attachLogger.js")(client);
require("./util/loadAssets.js")(client);

client.login(client.config.token);

process.on("unhandledRejection", reason => client.error(reason));
