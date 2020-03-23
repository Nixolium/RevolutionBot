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
    if (words.length == 1) {
        functions.sendMessage(message.channel, "Choose a target of the assassination. `assassin [target]`");
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
            functions.sendMessage(message.channel, "slapa, stupid");//and not stupid
            return
        }
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

    //check if you have 3+
    if (gameData["channels"][channel.id].players[playerNumber].money < 3) {
        functions.sendMessage(message.channel, "You need 3 Coins to Assassinate a player.")
        return
    }

    //action takes place
    gameData["channels"][channel.id]["lastMove"]["action"] = "assassin"
    gameData["channels"][channel.id]["lastMove"]["player"] = playerNumber
    gameData["channels"][channel.id]["lastMove"]["counter"] = -1
    gameData["channels"][channel.id]["lastMove"]["counterplayer"] = -1

    //money spent
    gameData["channels"][channel.id].players[playerNumber].money -= 3
    //---- Assassin Action
    //assassin(message, playerNumber, counterplayerNumber)

    let text = userData[gameData["channels"][channel.id].players[playerNumber].id].username + " wants to Assassinate " + userData[gameData["channels"][channel.id].players[counterplayerNumber].id].username
        + "\n*(🛑 blocks w/ Contessa)*"
    channel.send(text).then(function (message) {
        message.react('🛑')//.then(() => message.react('✅'));
        const filter = (reaction, user) => {// Note, there is no way to leave the game once you're in it.
            targetavy = user.avatarURL
            if (['🛑'].includes(reaction.emoji.name) && user.id == target) {
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
                functions.sendMessage(message.channel, userData[target].username + " blocks the assassination with Contessa.")

                gameData["channels"][channel.id]["lastMove"]["counter"] = "contessa"
                gameData["channels"][channel.id]["lastMove"]["counterplayer"] = counterplayerNumber
                return true;
            } else {
                return false;
            }
        };
        //prior to filter activation
        message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] }) //5 second interval
            .then(collected => {
                const reaction = collected.first();
                //Blocked
                if (reaction.emoji.name === '🛑') {
                    //Next Turn counter
                    if (functions.nextTurn(message) == false) {
                        delete gameData["channels"][channel.id] //game ends
                        functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
                        return
                    }

                    //set Gameboard
                    functions.getGameboard(message)
                } else {
                    if (gameData["channels"][channel.id]["lastMove"]["action"] == "assassin" && gameData["channels"][channel.id]["lastMove"]["player"] == playerNumber) {
                        assassin(message, playerNumber, counterplayerNumber)
                    } else {
                        //Next Turn counter
                        if (functions.nextTurn(message) == false) {
                            delete gameData["channels"][channel.id] //game ends
                            functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
                            return
                        }

                        //set Gameboard
                        functions.getGameboard(message)
                    }
                }
            })
            .catch(collected => {
                //Successful
                if (gameData["channels"][channel.id]["lastMove"]["action"] == "assassin" && gameData["channels"][channel.id]["lastMove"]["player"] == playerNumber) {
                    assassin(message, playerNumber, counterplayerNumber)
                } else {
                    //Next Turn counter
                    if (functions.nextTurn(message) == false) {
                        delete gameData["channels"][channel.id] //game ends
                        functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
                        return
                    }

                    //set Gameboard
                    functions.getGameboard(message)
                }
            });


    }).catch(function (err) {
        console.error(err)
    })
}

function assassin(message, playerNumber, counterplayerNumber) {
    let id = message.author.id;
    let channel = message.channel

    functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + " successfully assassinated " + userData[gameData["channels"][channel.id].players[counterplayerNumber].id].username + ".")

    if (gameData["channels"][channel.id].players[playerNumber].money == undefined) {
        gameData["channels"][channel.id].players[playerNumber].money = 0
    }

    gameData["channels"][channel.id]["lastMove"]["action"] = "assassincomplete"
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