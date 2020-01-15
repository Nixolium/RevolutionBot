module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    if (userData[id].status == 0) { return; }
    let ts = message.createdTimestamp;
    text = ""
    if (!userData[id].cd) {
        userData[id].cd = {}
    }
    let cooldowns = Object.keys(userData[id].cd)
    for (var i = 0; i < cooldowns.length; i++) {
        if (userData[id].cd[cooldowns[i]] > ts) {
            text += "**" + cooldowns[i] + ":** " + display.timeCalc(userData[id].cd[cooldowns[i]] - ts) + "\n"
        }
    }
    if (text == "") {
        text = "You have no ongoing cooldowns."
    }
    functions.sendMessage(message.channel, {
        "embed": {
            //"title": userData[id].username + "'s Cooldowns",
            //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
            "color": classColor[Math.floor(userData[id].class)],
            "fields": [
                {
                    "name": userData[id].username + "'s Cooldowns",
                    "value": text
                    //"inline": true
                }
            ]
        }
    })
}