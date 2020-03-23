module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let target = id;
    let ts = message.createdTimestamp;
    
    setuptext = ""
    setuptext += "`help` - Open the help page.\n"
    setuptext += "`start [x]` - Start a game of Coup-31 with 2-9 players.\n"
    setuptext += "`profile` - Opens a useless profile page.\n"
    setuptext += "`ping` - pong!\n"

    ingametext = ""
    ingametext += "`income` - +1 Coins\n"
    ingametext += "`foreign aid` | `fa` - +2 Coins, can be blocked by Duke\n"
    ingametext += "`duke` | `d` - +3 Coins; requires Duke card\n"
    ingametext += "`ambassador` | `amb` - Draw two cards and swap them with yours\n"
    ingametext += "`captain [target]` | `steal [target]` - Steal up to 2 coins\n"
    ingametext += "`assassin [target]` | `stab [target]` - Costs 3. Kill target, blocked by contessa\n"
    ingametext += "`coup [target]` - Costs 7. Kill target, unblockable\n"
    ingametext += "`challenge` | `c` - Call a player's bluff\n"
    ingametext += "`hand` - Look at your hand\n"
    ingametext += "`gameboard` | `gb` - Refresh the board\n"

    functions.sendMessage(message.channel, {
        "embed": {
            "title": "Help Page",
            //"description": "Here is your spell inventory\nUse `!cast [ID_of_Item]` to cast you spell... yeah \n",
            "color": 13498074,
            "fields": [
                {
                    "name": "Setup",
                    "value": setuptext,
                    "inline": false
                },{
                    "name": "Ingame Commands",
                    "value": ingametext,
                    "inline": false
                },
            ]
        }
    })
}
