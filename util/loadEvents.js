const reqEvent = event => require(`../events/${event}.js`);

module.exports = client => {
  client.on("ready", () => reqEvent("ready")(client));
  client.on("disconnect", event => reqEvent("disconnect")(client, event));
  client.on("reconnect", () => reqEvent("reconnect")(client));
  client.on("message", reqEvent("message"));

  client.on("error", client.error);
  client.on("warn", client.warn);
};
