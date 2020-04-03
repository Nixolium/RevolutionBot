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
    gameData["channels"][channel.id]["lastMove"]["action"] = "foreign"
    gameData["channels"][channel.id]["lastMove"]["player"] = playerNumber
    gameData["channels"][channel.id]["lastMove"]["counter"] = -1
    gameData["channels"][channel.id]["lastMove"]["counterplayer"] = -1

    //---- Block?
    let text = userData[gameData["channels"][channel.id].players[playerNumber].id].username + " wants to Foreign Aid"+ "\n*(🛑 blocks w/ Duke)*"
    channel.send(text).then(function (message) {
        message.react('🛑')//.then(() => message.react('✅'));

        const filter = (reaction, user) => {// Note, there is no way to leave the game once you're in it.
            target = user.id
            targetavy = user.avatarURL
            if (['🛑'].includes(reaction.emoji.name) && user.id != id && user.id != 666782838259187713) {
                let counterplayerNumber = -1
                for (let x = 0; x < gameData["channels"][channel.id].players.length; x++) {
                    if (gameData["channels"][channel.id].players[x].id == target) {
                        counterplayerNumber = x
                        break
                    }
                }
                if (counterplayerNumber == -1) {
                    //functions.sendMessage(message.channel, "You are not in a game.");
                    return false
                }
                if (functions.checkAlivePerson(message, target) == false) {
                    //functions.sendMessage(message.channel, "You aren't alive!");
                    return false
                }
                functions.sendMessage(message.channel, userData[target].username + " blocks the foreign aid with Duke.")
                gameData["channels"][channel.id]["lastMove"]["counter"] = "duke"
                gameData["channels"][channel.id]["lastMove"]["counterplayer"] = counterplayerNumber
                return true;
            } else {
                return false;
            }
        };
        //prior to filter activation
        message.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] }) //5 second interval
            .then(collected => {
                const reaction = collected.first();
                //Blocked
                if (reaction.emoji.name === '🛑') {
                    //Next Turn counter
                    if (functions.nextTurn(message) == false) {
                        // //game ends
                        functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
        return
                    }

                    //set Gameboard
                    functions.getGameboard(message)
                } else {
                    foreignaid(message, playerNumber)
                }
            })
            .catch(collected => {
                //Successful

                foreignaid(message, playerNumber)
            });


    }).catch(function (err) {
        console.error(err)
    })
    //
}

function foreignaid(message, playerNumber) {
    let id = message.author.id;
    let channel = message.channel

    functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + " successfully Foreign Aided *(+2 Coins)*.")

    if (gameData["channels"][channel.id].players[playerNumber].money == undefined) {
        gameData["channels"][channel.id].players[playerNumber].money = 0
    }

    gameData["channels"][channel.id].players[playerNumber].money += 2

    //Next Turn counter
    if (functions.nextTurn(message) == false) {
        // //game ends
        functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
        return
    }

    //set Gameboard
    functions.getGameboard(message)
}