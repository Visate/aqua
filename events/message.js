const unflips = require("../lists/unflips.json");
const tableflipRegex = /(?:ʕノ•ᴥ•ʔノ|\(\/¯◡ ‿ ◡\)\/¯ ~|\(._.\) ~|\(╯'□'\)╯|\(╯°□°）╯|\(ノ ゜Д゜\)ノ|\‎?\(ﾉಥ益ಥ）ﾉ\﻿?)\s?︵? ┻(━*)┻/;  //eslint-disable-line no-irregular-whitespace

const tableUnflipper = message => {
  let flippedTable = message.content.match(tableflipRegex);
  if (flippedTable) {
    let chance = Math.round(Math.random() * 100);
    if (chance < 10) {
      return message.reply(unflips.gif[Math.floor(Math.random() * unflips.gif.length)]);
    }
    else {
      return message.reply(unflips.text[Math.floor(Math.random() * unflips.text.length)].replace(/\$/g, flippedTable[1]));
    }
  }
};

module.exports = msg => {
  const client = msg.client;

  // restrictions
  if (msg.author.id === client.user.id) return;
  if (msg.author.bot) return;

  let prefix;
  if (msg.content.startsWith(client.config.prefix)) prefix = client.config.prefix;
  else if (msg.content.startsWith(`${client.user} `)) prefix = `${client.user} `;
  else return tableUnflipper(msg);

  // command interpreting
  let command = msg.content.substring(prefix.length).split(" ")[0];
  let suffix = msg.content.substring(prefix.length + command.length + 1);
  let permLevel = client.util.checkPermLevel(msg);
  let cmd = client.commands.has(command) ? client.commands.get(command) : client.commands.get(client.aliases.get(command));

  if (cmd) {
    if (!cmd.config.enabled) return;
    if (cmd.config.guildOnly && !msg.guild) return;
    if (permLevel < cmd.config.permLevel) return;

    let location = msg.guild ? `${msg.guild.name} (#${msg.channel.name})` : "private messages";
    cmd.run(client, msg, suffix);
    client.log(`Command run by ${msg.author.username}#${msg.author.discriminator} in ${location}: ${msg.content}`);
  }
};
