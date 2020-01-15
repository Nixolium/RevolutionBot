module.exports = function (message) {
    //let id = message.author.id;
    functions.sendMessage(message.channel, {
      "embed": {
        //"title": userData[id].username + "'s Cooldowns",
        //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
        "color": 0xffffff,
        "title": "⏳ - Pong! (" + Math.floor(bot.ping) + " ms)"
      }
    })
  }