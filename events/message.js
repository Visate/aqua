const unflips = require("../lists/unflips.json");
const tableUnflipper = message => {
  let flippedTable = message.content.match(/(?:ʕノ•ᴥ•ʔノ|\(\/¯◡ ‿ ◡\)\/¯ ~|\(._.\) ~|\(╯'□'\)╯|\(╯°□°）╯|\(ノ ゜Д゜\)ノ|\‎?\(ﾉಥ益ಥ）ﾉ\﻿?)\s?︵? ┻(━*)┻/);  //eslint-disable-line no-irregular-whitespace
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
