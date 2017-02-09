const reqEvent = event => require(`../events/${event}.js`);

module.exports = client => {
  client.on("ready", () => reqEvent("ready")(client));
  client.on("disconnect", () => reqEvent("disconnect")(client));
  client.on("reconnect", () => reqEvent("reconnect")(client));
  client.on("message", reqEvent("message"));
  client.on("voiceStateUpdate", reqEvent("voiceStateUpdate"));
  client.on("error", client.error);
  client.on("warn", client.warn);
};
