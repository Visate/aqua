// Help command
exports.help = {
  name: "help",
  usage: "[command]",
  description: "Displays a help message.",
  extendedhelp: "Sends a command guide or how to use a specific command."
};

exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "?"]
};

exports.run = (client, msg, suffix) => {
  let msgArray = [];

  if (!suffix) {
    msgArray.push(`= Your Guide to Using ${client.user.username}=`);
    msgArray.push(`[Use ${client.config.prefix}help <command> for details]\n`);
    client.commands.forEach(cmd => {
      if (!cmd.config.enabled) return;
      if (cmd.config.guildOnly && !msg.guild) return;
      let message = `${cmd.help.name}${cmd.help.usage ? ` ${cmd.help.usage}` : ""}:: ${cmd.help.description}`;
      msgArray.push(message);
    });
    
    // Affirms that a DM has been sent, then removes the reaction afterwards
    if (msg.guild) msg.react(":mailbox_with_mail:").then(() => setTimeout(() => msg.clearReactions(), 5000));
    msg.author.sendCode("asciidoc", msgArray);
  }

  else if (suffix && client.commands.has(suffix)) {
    let cmd = client.commands.get(suffix);
    if (!cmd.config.enabled) return;
    if (cmd.config.guildOnly && !msg.guild) return;
    let helpDetails = client.util.stripIndents`
    = ${cmd.help.name} =
    Usage:: ${cmd.help.name} ${cmd.help.usage ? cmd.help.usage : ""}

    ${cmd.help.extendedhelp}
    `;

    msg.channel.sendCode("asciidoc", helpDetails);
  }
};
