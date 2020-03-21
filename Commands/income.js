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

    gameData["channels"][channel.id].players[playerNumber].money += 1

    if (functions.nextTurn(message) == false) {
        delete gameData["channels"][channel.id] //game ends
        functions.sendMessage(message.channel, "<@" + id + "> Wins!");
    }
    functions.getGameboard(message)
}