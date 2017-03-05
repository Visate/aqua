module.exports = msg => {
  const client = msg.client;

  // Restrictions
  if (msg.author.id === client.user.id) return;
  if (msg.author.bot) return;

  let prefix;
  if (msg.content.startsWith(client.config.prefix)) prefix = client.config.prefix;
  else if (msg.content.startsWith(`${client.user} `)) prefix = `${client.user} `;

  // Command interpreting
  let command = msg.content.substring(prefix.length).split(" ")[0];
  let suffix = msg.content.substring(prefix.length + command.length + 1);
  let cmd = client.commands.has(command) ? client.commands.get(command) : client.commands.get(client.aliases.get(command));

  if (cmd) {
    if (!cmd.config.enabled) return;
    if (cmd.config.guildOnly && !msg.guild) return;

    let location = msg.guild ? `${msg.guild.name} (#${msg.channel.name})` : "private messages";
    cmd.run(client, msg, suffix);
    client.log(`Command run by ${msg.author.username}#${msg.author.discriminator} in ${location}: ${msg.content}`);
  }
};
