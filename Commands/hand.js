module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let target = id;
    let ts = message.createdTimestamp;
    let channel = message.channel
    //no targets allowed, target always id
    if (gameData["channels"][message.channel.id] == undefined) {
        functions.sendMessage(message.channel, "There is not currently a game ongoing.");
        return;
    }
    let playerNumber = -1
    for (let x = 0; x < gameData["channels"][channel.id].players.length; x++) {
        console.log(gameData["channels"][channel.id].players[x].id)
        if (gameData["channels"][channel.id].players[x].id == target) {
            playerNumber = x
            break
        }
    }
    if (playerNumber == -1) {
        functions.sendMessage(message.channel, "You are not in a game.");
        return
    }
    let cardsInHandText = ""
    let breaker = false
    for (let x = 0; x < 3; x++) {
        if (breaker == false) {
            cardNumber = gameData["channels"][channel.id].players[playerNumber].cards[x]
            cardsInHandText += gameData.roles[Math.abs(cardNumber) - 1].name
            if (cardNumber <= 0) {
                cardsInHandText += " *(Dead)*"
            } else {
                cardsInHandText += " *(Active)*"
                breaker = true
            }
            cardsInHandText += "\n"
        } else {
            cardsInHandText += "??? *(Unknown)*\n"
        }
    }

    functions.dmUser(target, {
        "embed": {
            "title": "Your Cards",
            "description": "Your Coins: " + gameData["channels"][channel.id].players[playerNumber].money,
            "color": 13498074,
            "thumbnail": {
                url: userData[target].avy
            },
            "fields": [
                {
                    name: "🃏 Center Card 🃏",
                    value: gameData.roles[(gameData["channels"][channel.id].centerCard) - 1].name,
                    inline: false
                },
                {
                    "name": "🎴 Cards in Hand 🎴",
                    "value": cardsInHandText,
                    "inline": true
                },
            ],
            "footer": {
                "text": "Game ID: " + message.channel.id
            }
        }
    })
}
