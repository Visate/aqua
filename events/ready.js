module.exports = client => {
  client.log(`Logged in as ${client.user.username}!`);
  client.log(`Serving ${client.users.size} users in ${client.channels.size} channels in ${client.guilds.size} servers.`);
  client.log("--------------------------------");

  if (client.config.homeServer) client.homeServer = client.guilds.get(client.config.homeServer);
  if (client.config.homeServer && client.config.homeChannel) client.homeChannel = client.homeServer.channels.get(client.config.homeChannel);
  else client.homeChannel = client.homeServer.defaultChannel;

  client.homeChannel.sendMessage(`${client.config.permissions.master[0] ? `${client.homeServer.members.get(client.config.permissions.master[0])}\n` : ""}${client.user.username}: **ONLINE**`);
};
