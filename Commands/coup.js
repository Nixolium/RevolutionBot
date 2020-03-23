module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let target = -1;
    let ts = message.createdTimestamp;
    let channel = message.channel
    let counterplayerNumber = -1
    if (gameData["channels"][message.channel.id] == undefined) {
        functions.sendMessage(message.channel, "There is not currently a game ongoing.");
        return;
    }

    let playerNumber = -1
    for (let x = 0; x < gameData["channels"][channel.id].players.length; x++) {
        console.log(gameData["channels"][channel.id].players[x].id)
        if (gameData["channels"][channel.id].players[x].id == id) {
            playerNumber = x
            break
        }
    }
    if (playerNumber == -1) {
        functions.sendMessage(message.channel, "You are not in a game.");
        return
    }
    //above checks if there is game and if you are in it

    //you are alive in game
    if (functions.checkAlive(message) == false) {
        functions.sendMessage(message.channel, "You are not alive!");
        return
    }

    if (words.length == 1) {
        functions.sendMessage(message.channel, "Choose a target of the coup. `coup [target]`");
        return;
    } else {
        target = functions.validate(message)
        //check if target in game
        for (let x = 0; x < gameData["channels"][channel.id].players.length; x++) {
            if (gameData["channels"][channel.id].players[x].id == target) {
                counterplayerNumber = x
                break
            }
        }
        if (counterplayerNumber == -1) {
            functions.sendMessage(message.channel, "They are not in a game.");
            return
        }
        if (functions.checkAlivePerson(message, target) == false) {
            functions.sendMessage(message.channel, "They aren't alive!");//and alive
            return
        }

        if (target == id) {
            functions.sendMessage(message.channel, "baka");//and not stupid
        }
    }

    //check if it is your turn.
    if (playerNumber != gameData["channels"][channel.id].currentTurn) {
        functions.sendMessage(message.channel, "It is not your turn right now");
        return
    }

    //if you already moved this turn?
    if (gameData["channels"][channel.id]["lastMove"]["player"] == playerNumber) {
        functions.sendMessage(message.channel, "You already moved this turn.")
        return
    }

    //check if you have 7+
    if (gameData["channels"][channel.id].players[playerNumber].money < 7) {
        functions.sendMessage(message.channel, "You need 7 Coins to Coup a player.")
        return
    }

    //action takes place
    gameData["channels"][channel.id]["lastMove"]["action"] = "coup"
    gameData["channels"][channel.id]["lastMove"]["player"] = playerNumber
    gameData["channels"][channel.id]["lastMove"]["counter"] = -1
    gameData["channels"][channel.id]["lastMove"]["counterplayer"] = -1

    //---- Coup Action
    coup(message, playerNumber, counterplayerNumber)
}

function coup(message, playerNumber, counterplayerNumber) {
    let id = message.author.id;
    let channel = message.channel

    functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + " successfully Couped " + message.channel, userData[gameData["channels"][channel.id].players[counterplayerNumber].id].username) + "."

    if (gameData["channels"][channel.id].players[playerNumber].money == undefined) {
        gameData["channels"][channel.id].players[playerNumber].money = 0
    }

    gameData["channels"][channel.id].players[playerNumber].money -= 7

    functions.loseCard(message, counterplayerNumber)

    //Next Turn counter
    if (functions.nextTurn(message) == false) {
        delete gameData["channels"][channel.id] //game ends
        functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
        return
    }

    //set Gameboard
    functions.getGameboard(message)
}