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
    //above checks if there is game and if you are in it

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

    //check if you have 10+
    if (gameData["channels"][channel.id].players[playerNumber].money >= 10) {
        functions.sendMessage(message.channel, "You have 10 or more Coins. You must Coup a player.")
        return
    }

    //action takes place
    gameData["channels"][channel.id]["lastMove"]["action"] = "duke"
    gameData["channels"][channel.id]["lastMove"]["player"] = playerNumber
    gameData["channels"][channel.id]["lastMove"]["counter"] = -1
    gameData["channels"][channel.id]["lastMove"]["counterplayer"] = -1

    //---- Block?
    functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + " wants to Duke *(Any Challenges?)*")

    setTimeout(() => {
        if (gameData["channels"][channel.id]["lastMove"]["action"] == "duke" && gameData["channels"][channel.id]["lastMove"]["player"] == playerNumber) {
            duke(message, playerNumber)
        } else {
            //challenge function will shift turns If fail, this will just fizzle
            //Next Turn counter
            if (functions.nextTurn(message) == false) {
                delete gameData["channels"][channel.id] //game ends
                functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
                return
            }

            //set Gameboard
            functions.getGameboard(message)
        }
    }, 5000);
}

function duke(message, playerNumber) {
    let id = message.author.id;
    let channel = message.channel

    functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + " successfully Duked *(+3 Coins)*")

    gameData["channels"][channel.id]["lastMove"]["action"] = "dukeearned"

    if (gameData["channels"][channel.id].players[playerNumber].money == undefined) {
        gameData["channels"][channel.id].players[playerNumber].money = 0
    }

    gameData["channels"][channel.id].players[playerNumber].money += 3

    //Next Turn counter
    if (functions.nextTurn(message) == false) {
        delete gameData["channels"][channel.id] //game ends
        functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
        return
    }

    //set Gameboard
    functions.getGameboard(message)
}