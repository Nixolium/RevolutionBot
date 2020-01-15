module.exports = function (message) {
    let pages = []
    let page = {
        "embed": {
            "title": "General Commands (Prefix: \"" + defaultPrefix + "\")",
            "color": 16312092,
            "footer": {
            },
            "fields": [
                {
                    "name": "start",
                    "value": "Start your adventure!"
                },
                {
                    "name": "help",
                    "value": "Brings up the command list."
                },
                {
                    "name": "invite",
                    "value": "Brings up info about the bot as well as the way to invite this bot to your server."
                },
                {
                    "name": "ping",
                    "value": "Ping the bot."
                },
                {
                    "name": "myid",
                    "value": "Returns your User ID."
                }
            ]
        }
    }
    pages.push(page)

    page = {
        "embed": {
            "title": "Game Commands (Prefix: \"" + defaultPrefix + "\|)",
            "color": 16312092,
            "footer": {
            },
            "fields": [
                {
                    "name": "profile | p",
                    "value": "Open your profile for information on your character."
                },
                {
                    "name": "class",
                    "value": "Choose a class to become. Subclasses coming soon."
                },
                {
                    "name": "arsenal",
                    "value": "Look at which weapons you have. Use `equip` to equip one among them."
                },
                {
                    "name": "materials",
                    "value": "Look at your materials for crafting."
                },
                {
                    "name": "adventure | adv",
                    "value": "Go on an adventure!"
                },
                {
                    "name": "cooldowns | cd",
                    "value": "Look at your cooldowns!"
                },
                {
                    "name": "richest | srtop",
                    "value": "Look at the player with the most money or the most sr points."
                },
                {
                    "name": "market",
                    "value": "Open the market. Use `market help` to get more information on how to use the market."
                },
                {
                    "name": "craft",
                    "value": "Craft powerful weapons. Coming soon."
                },
                {
                    "name": "smelt",
                    "value": "Destroy items for money and materials."
                },
                {
                    "name": "daily",
                    "value": "Collect a daily reward."
                },
                {
                    "name": "battle | qbattle",
                    "value": "Create an open challenge to fight other players. qbattle autofights for you."
                }
            ]
        }
    }
    pages.push(page)
    new functions.Paginator(message.channel, message.author, pages)
}