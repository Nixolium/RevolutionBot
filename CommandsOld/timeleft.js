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
    
    text += "**Reddit Royale Round 2:** " + display.timeCalc(1570345238058 - ts) + "\n"
    //text += (ts+56760000);

    if (text == "") {
        text = "Nothing's going on..."
    }
    functions.sendMessage(message.channel, {
        "embed": {
            //"title": userData[id].username + "'s Cooldowns",
            //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
            "color": classColor[Math.floor(userData[id].class)],
            "fields": [
                {
                    "name": "Time Until...",
                    "value": text
                    //"inline": true
                }
            ]
        }
    })
}