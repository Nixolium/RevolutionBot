module.exports = function (message) {
    let words = message.content.split(/\s+/)
    id = message.author.id;
    let ts = message.createdTimestamp;
    if (userData[id].status == 0) { return; }
    if (display.checkCooldown(message, "Daily") == false) {
        return;
    }
    functions.sendMessage(message.channel, {
        "embed": {
            //"title": userData[id].username + "'s Cooldowns",
            //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
            "color": classColor[Math.floor(userData[id].class)],
            "title": "🎁 - " + userData[id].username + " earned their daily $10!"
        }
    })
    functions.addmoney(message, 10)
    display.setCooldown(message, "Daily", 64800)
}