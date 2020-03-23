module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let target = -1;
    let ts = message.createdTimestamp;
    let channel = message.channel
    let supermessage = message

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

    if (gameData["channels"][channel.id]["lastMove"]["action"] == -1) {
        functions.sendMessage(message.channel, "Nothing can be challenged! *(Actions may have been finished)*");
        return
    }

    //if counter exists, challenge that, then see
    /*
    gameData["channels"][channel.id]["lastMove"]["action"] = "ambassador"
    gameData["channels"][channel.id]["lastMove"]["player"] = playerNumber
    gameData["channels"][channel.id]["lastMove"]["counter"] = -1
    gameData["channels"][channel.id]["lastMove"]["counterplayer"] = -1
    */
    let dumb = false
    let doeshavecard = false
    let yun = userData[gameData["channels"][channel.id].players[playerNumber].id].username
    let counter = gameData["channels"][channel.id]["lastMove"]["counter"]
    if (counter != -1) {
        let enemy = gameData["channels"][channel.id]["lastMove"]["counterplayer"]
        let eun = userData[gameData["channels"][channel.id].players[enemy].id].username

        if (counter == "duke") {//duke
            dumb = dumbcheck(supermessage, playerNumber, 5)
            doeshavecard = check(supermessage, enemy, 5)
            functions.sendMessage(message.channel, yun + " doesn't believe " + eun + " has a " + counter + "...");
            if (doeshavecard || dumb) {
                functions.sendMessage(message.channel, eun + " actually has a " + counter + "!");
                if (!dumb) {
                    let cardNumber = -1
                    let cardPlace = -1
                    for (let x = 0; x < 3; x++) {//shuffles card in
                        cardNumber = gameData["channels"][supermessage.channel.id].players[enemy].cards[x]
                        if (cardNumber <= 0) {

                        } else {
                            gameData["channels"][supermessage.channel.id].cards.push(cardNumber)
                            cardPlace = x
                            break
                        }
                    }
                    gameData["channels"][channel.id].players[enemy].cards[cardPlace] = gameData["channels"][channel.id].cards.shift()
                } else {
                    functions.sendMessage(message.channel, + "Look at the board, stupid");
                }

                //you lose a card
                functions.loseCard(message, playerNumber)
                functions.sendMessage(message.channel, yun + " loses a card");
            } else {
                functions.sendMessage(message.channel, eun + " does not actually have a " + counter + ". They lose a card.");
                functions.loseCard(message, enemy)
                foreignaid(message, playerNumber)
            }
        }

        if (counter == "captain") {//captain
            dumb = dumbcheck(supermessage, playerNumber, 3)
            doeshavecard = check(supermessage, enemy, 3)
            functions.sendMessage(message.channel, yun + " doesn't believe " + eun + " has a " + counter + "...");
            if (doeshavecard || dumb) {
                functions.sendMessage(message.channel, eun + " actually has a " + counter + "!");
                if (!dumb) {
                    let cardNumber = -1
                    let cardPlace = -1
                    for (let x = 0; x < 3; x++) {//shuffles card in
                        cardNumber = gameData["channels"][supermessage.channel.id].players[enemy].cards[x]
                        if (cardNumber <= 0) {

                        } else {
                            gameData["channels"][supermessage.channel.id].cards.push(cardNumber)
                            cardPlace = x
                            break
                        }
                    }
                    gameData["channels"][channel.id].players[enemy].cards[cardPlace] = gameData["channels"][channel.id].cards.shift()
                } else {
                    functions.sendMessage(message.channel, + "Look at the board, stupid");
                }

                //you lose a card
                functions.loseCard(message, playerNumber)
                functions.sendMessage(message.channel, yun + " loses a card");
            } else {
                functions.sendMessage(message.channel, eun + " does not actually have a " + counter + ". They lose a card.");
                functions.loseCard(message, enemy)
                captain(message, gameData["channels"][channel.id]["lastMove"]["player"], gameData["channels"][channel.id]["lastMove"]["counterplayer"])
            }
        }

        if (counter == "ambassador") {//captain
            dumb = dumbcheck(supermessage, playerNumber, 1)
            doeshavecard = check(supermessage, enemy, 1)
            functions.sendMessage(message.channel, yun + " doesn't believe " + eun + " has a " + counter + "...");
            if (doeshavecard || dumb) {
                functions.sendMessage(message.channel, eun + " actually has a " + counter + "!");
                if (!dumb) {
                    let cardNumber = -1
                    let cardPlace = -1
                    for (let x = 0; x < 3; x++) {//shuffles card in
                        cardNumber = gameData["channels"][supermessage.channel.id].players[enemy].cards[x]
                        if (cardNumber <= 0) {

                        } else {
                            gameData["channels"][supermessage.channel.id].cards.push(cardNumber)
                            cardPlace = x
                            break
                        }
                    }
                    gameData["channels"][channel.id].players[enemy].cards[cardPlace] = gameData["channels"][channel.id].cards.shift()
                } else {
                    functions.sendMessage(message.channel, + "Look at the board, stupid");
                }

                //you lose a card
                functions.loseCard(message, playerNumber)
                functions.sendMessage(message.channel, yun + " loses a card");
            } else {
                functions.sendMessage(message.channel, eun + " does not actually have a " + counter + ". They lose a card.");
                functions.loseCard(message, enemy)
                captain(message, gameData["channels"][channel.id]["lastMove"]["player"], gameData["channels"][channel.id]["lastMove"]["counterplayer"])
            }
        }

        if (counter == "contessa") {//captain
            dumb = dumbcheck(supermessage, enemy, 4)
            doeshavecard = check(supermessage, enemy, 4)
            functions.sendMessage(message.channel, yun + " doesn't believe " + eun + " has a " + counter + "...");
            if (doeshavecard || dumb) {
                functions.sendMessage(message.channel, eun + " actually has a " + counter + "!");
                if (!dumb) {
                    let cardNumber = -1
                    let cardPlace = -1
                    for (let x = 0; x < 3; x++) {//shuffles card in
                        cardNumber = gameData["channels"][supermessage.channel.id].players[enemy].cards[x]
                        if (cardNumber <= 0) {

                        } else {
                            gameData["channels"][supermessage.channel.id].cards.push(cardNumber)
                            cardPlace = x
                            break
                        }
                    }
                    gameData["channels"][channel.id].players[enemy].cards[cardPlace] = gameData["channels"][channel.id].cards.shift()
                } else {
                    functions.sendMessage(message.channel, + "Look at the board, stupid");
                }

                //you lose a card
                functions.loseCard(message, playerNumber)
                functions.sendMessage(message.channel, yun + " loses a card");
            } else {
                functions.sendMessage(message.channel, eun + " does not actually have a " + counter + ". They lose a card.");
                functions.loseCard(message, enemy)
                assassin(message, gameData["channels"][channel.id]["lastMove"]["player"], gameData["channels"][channel.id]["lastMove"]["counterplayer"])
            }
        }

    } else {//if no counter, check if action is challengable, then see
        let action = gameData["channels"][channel.id]["lastMove"]["action"]
        let enemy = gameData["channels"][channel.id]["lastMove"]["player"]
        let eun = userData[gameData["channels"][channel.id].players[enemy].id].username
        if (action == "assassincomplete") {
            functions.sendMessage(message.channel, eun + " has already finished the Assassination!");
            return
        }
        if (action == "ambassadormid") {
            functions.sendMessage(message.channel, eun + " has already finished Ambassing!");
            return
        }
        if (action == "captainstolen") {
            functions.sendMessage(message.channel, eun + " has already stolen the money!");
            return
        }
        if (action == "dukeearned") {
            functions.sendMessage(message.channel, eun + " has already banked the money!");
            return
        }
        if (action == "income") {
            functions.sendMessage(message.channel, "Incoming can't be challenged");
            return
        }
        if (action == "coup") {
            functions.sendMessage(message.channel, "Coups can't be challenged");
            return
        }
        if (action == "contessa") {
            functions.sendMessage(message.channel, "I have no idea how you got a contessa action...");
            return
        }
        let actionarray = ["zero", "ambassador", "assassin", "captain", "contessa", "duke"]
        if (action == "ambassador" || action == "assassin" || action == "captain" || action == "duke") {
            dumb = dumbcheck(supermessage, enemy, actionarray.indexOf(action))
            doeshavecard = check(supermessage, enemy, actionarray.indexOf(action))
            console.log(doeshavecard)
            functions.sendMessage(message.channel, yun + " doesn't believe " + eun + " has a " + action + "...");
            if (doeshavecard || dumb) {
                functions.sendMessage(message.channel, eun + " actually has a " + action + "!");
                if (!dumb) {
                    let cardNumber = -1
                    let cardPlace = -1
                    for (let x = 0; x < 3; x++) {//shuffles card in
                        cardNumber = gameData["channels"][supermessage.channel.id].players[enemy].cards[x]
                        if (cardNumber <= 0) {

                        } else {
                            gameData["channels"][supermessage.channel.id].cards.push(cardNumber)
                            cardPlace = x
                            break
                        }
                    }
                    gameData["channels"][channel.id].players[enemy].cards[cardPlace] = gameData["channels"][channel.id].cards.shift()
                } else {
                    functions.sendMessage(message.channel, + "Look at the board, stupid");
                }

                //you lose a card
                functions.loseCard(message, playerNumber)
                functions.sendMessage(message.channel, yun + " loses a card");
            } else {
                functions.sendMessage(message.channel, eun + " does not actually have a " + action + ". They lose a card.");
                functions.loseCard(message, enemy)
                gameData["channels"][channel.id]["lastMove"]["action"] = -1
            }
        }
    }

    //Next Turn counter
    /*if (functions.nextTurn(message) == false) {
        delete gameData["channels"][channel.id] //game ends
        functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
        return
    }

    //set Gameboard
    functions.getGameboard(message)
    */
    return
}
function dumbcheck(supermessage, playerNumber, item) {
    if (gameData["channels"][supermessage.channel.id].centerCard == item) {
        return true
    }
}
function check(supermessage, playerNumber, item) {
    let cardNumber = -1
    for (let x = 0; x < 3; x++) {
        cardNumber = gameData["channels"][supermessage.channel.id].players[playerNumber].cards[x]
        if (cardNumber <= 0) {

        } else {
            console.log(item + "||" + cardNumber)
            if (cardNumber == item) {
                return true
            } else {
                return false
            }
        }
    }
    return false
}

function foreignaid(message, playerNumber) {
    let id = message.author.id;
    let channel = message.channel

    functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + " successfully Foreign Aided *(+2 Coins)*.")

    if (gameData["channels"][channel.id].players[playerNumber].money == undefined) {
        gameData["channels"][channel.id].players[playerNumber].money = 0
    }

    gameData["channels"][channel.id].players[playerNumber].money += 2
}

function captain(message, playerNumber, counterplayerNumber) {
    let id = message.author.id;
    let channel = message.channel

    if (gameData["channels"][channel.id].players[playerNumber].money == undefined) {
        gameData["channels"][channel.id].players[playerNumber].money = 0
    }

    if (gameData["channels"][channel.id].players[counterplayerNumber].money == undefined) {
        gameData["channels"][channel.id].players[counterplayerNumber].money = 0
    }
    let stealamount = 2
    if (gameData["channels"][channel.id].players[counterplayerNumber].money < 2) {
        stealamount = gameData["channels"][channel.id].players[counterplayerNumber].money
    }
    gameData["channels"][channel.id].players[counterplayerNumber].money -= stealamount
    gameData["channels"][channel.id].players[playerNumber].money += stealamount

    functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + " successfully stole "
        + stealamount + " from " + userData[gameData["channels"][channel.id].players[counterplayerNumber].id].username + ".")
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
}