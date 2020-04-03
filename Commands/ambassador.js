module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let target = id;
    let ts = message.createdTimestamp;
    let channel = message.channel
    let origin = message.channel
    let supermessage = message
    //no targets allowed, target always id
    if (gameData["channels"][message.channel.id] == undefined) {
        functions.sendMessage(message.channel, "There is not currently a game ongoing.");
        return;
    }
    let playerNumber = -1
    for (let x = 0; x < gameData["channels"][channel.id].players.length; x++) {
        //console.log(gameData["channels"][channel.id].players[x].id)
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
    gameData["channels"][channel.id]["lastMove"]["action"] = "ambassador"
    gameData["channels"][channel.id]["lastMove"]["player"] = playerNumber
    gameData["channels"][channel.id]["lastMove"]["counter"] = -1
    gameData["channels"][channel.id]["lastMove"]["counterplayer"] = -1

    //---- Block?
    functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + " wants to Ambass *(Any Challenges?)*")

    setTimeout(() => {
        if (gameData["channels"][channel.id]["lastMove"]["action"] == "ambassador" && gameData["channels"][channel.id]["lastMove"]["player"] == playerNumber) {
            gameData["channels"][channel.id]["lastMove"]["action"] = "ambassadormid"
            ambassador(supermessage.channel, playerNumber, supermessage)
        } else {
            //Next Turn counter
            if (functions.nextTurn(message) == false) {
               //game ends
                functions.sendMessage(message.channel, userData[gameData["channels"][channel.id].players[playerNumber].id].username + "Wins!");
                return
            }

            //set Gameboard
            functions.getGameboard(message)
            //challenge function will shift turns If fail, this will just fizzle
        }
    }, 15000);
}

function ambassador(message, playerNumber, supermessage) {
    let id = gameData["channels"][supermessage.channel.id].players[playerNumber].id;
    let channel = message.channel
    let origin = message.channel

    functions.sendMessage(supermessage.channel, userData[gameData["channels"][supermessage.channel.id].players[playerNumber].id].username + " successfully Ambassed *(Swap 2 Cards)*")
    //dm thing...

    let tempra = []
    tempra.push(gameData["channels"][supermessage.channel.id].cards.shift())
    tempra.push(gameData["channels"][supermessage.channel.id].cards.shift())
    let tempra2 = []

    let embedvalue = ""
    let emojira = ["🅰️", "🇧", "🇨"]
    for (let x = 0; x < tempra.length; x++) {
        embedvalue += emojira[x + 1] + ": " + gameData.roles[tempra[x] - 1].name + "\n"
    }
    let text = {
        "embed": {
            "title": "Choose a card to put into the center",
            "color": 13498074,
            "thumbnail": {
                url: userData[id].avy
            },
            "fields": [
                {
                    name: "🃏 Center Card 🃏",
                    value: "🅰️: " + gameData.roles[(gameData["channels"][supermessage.channel.id].centerCard) - 1].name,
                    inline: false
                },
                {
                    "name": "🎴 From Deck 🎴",
                    "value": embedvalue,
                    "inline": true
                },
            ],
            "footer": {
                "text": "Game ID: " + supermessage.channel.id
            }
        }
    }

    bot.users.get(id).send(text).then(function (message) {
        message.react('🅰️').then(() => message.react('🇧')).then(() => message.react('🇨'));

        const filter = (reaction, user) => {// Note, there is no way to leave the game once you're in it.
            if ((['🅰️'].includes(reaction.emoji.name) || ['🇧'].includes(reaction.emoji.name) || ['🇨'].includes(reaction.emoji.name)) && user.id == id) {
                return true;
            } else {
                return false;
            }
        };
        //prior to filter activation
        message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }) //5 second interval
            .then(collected => {
                const reaction = collected.first();
                //console.log(tempra)
                if (reaction.emoji.name === '🅰️') {
                    //Nothing changes.
                } else if (reaction.emoji.name === '🇧') {
                    //move a to main, place b in mid
                    gameData["channels"][supermessage.channel.id].cards.push(gameData["channels"][supermessage.channel.id].centerCard)
                    //console.log(tempra[0])
                    gameData["channels"][supermessage.channel.id].centerCard = tempra[0]
                    tempra2.push(tempra.shift())
                } else if (reaction.emoji.name === '🇨') {
                    //move a to main, place c in mid
                    gameData["channels"][supermessage.channel.id].cards.push(gameData["channels"][supermessage.channel.id].centerCard)
                    //console.log(tempra[1])
                    gameData["channels"][supermessage.channel.id].centerCard = tempra[1]
                    tempra2.push(tempra.pop())
                    //console.log("popped")
                } else {

                }

                ambass2(playerNumber, tempra, supermessage, tempra2)
            })
            .catch(collected => {
                ambass2(playerNumber, tempra, supermessage, tempra2)
            });


    }).catch(function (err) {
        console.error(err)
    })


}



//---------------------------------------



function ambass2(playerNumber, tempra, supermessage, tempra2) {
    console.log(tempra + " " + tempra2)
    let id = gameData["channels"][supermessage.channel.id].players[playerNumber].id;
    let embedvalue = ""
    let emojira = ["🅰️", "🇧", "🇨"]
    for (let x = 0; x < tempra.length; x++) {
        embedvalue += emojira[x + 1] + ": " + gameData.roles[tempra[x] - 1].name + "\n"
    }
    handcard = "🅰️: "
    let cardspace = 0
    for (let x = 0; x < 3; x++) {
        let cardNumber = gameData["channels"][supermessage.channel.id].players[playerNumber].cards[x]
        if (cardNumber <= 0) {

        } else {
            handcard += gameData.roles[cardNumber - 1].name
            cardspace = x
            break
        }
    }
    let text = {
        "embed": {
            "title": "Choose a card to put into your hand",
            "color": 13498074,
            "thumbnail": {
                url: userData[id].avy
            },
            "fields": [
                {
                    name: "🃏 Active Card 🃏",
                    value: handcard,
                    inline: false
                },
                {
                    "name": "🎴 From Deck 🎴",
                    "value": embedvalue,
                    "inline": true
                },
            ],
            "footer": {
                "text": "Game ID: " + supermessage.channel.id
            }
        }
    }

    bot.users.get(id).send(text).then(function (message) {
        if (tempra.length == 1) {
            message.react('🅰️').then(() => message.react('🇧'))
        } else {
            message.react('🅰️').then(() => message.react('🇧')).then(() => message.react('🇨'));
        }
        const filter = (reaction, user) => {// Note, there is no way to leave the game once you're in it.
            if ((['🅰️'].includes(reaction.emoji.name) || ['🇧'].includes(reaction.emoji.name) || ['🇨'].includes(reaction.emoji.name)) && user.id == id) {
                if (tempra.length == 1 && ['🇨'].includes(reaction.emoji.name)) {
                    return false
                }
                return true;
            } else {
                return false;
            }
        };
        //prior to filter activation
        message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }) //5 second interval
            .then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '🅰️') {
                    //Nothing changes.
                } else if (reaction.emoji.name === '🇧') {
                    //move a to main, place b in mid
                    gameData["channels"][supermessage.channel.id].cards.push(gameData["channels"][supermessage.channel.id].players[playerNumber].cards[cardspace])
                    gameData["channels"][supermessage.channel.id].players[playerNumber].cards[cardspace] = tempra[0]
                    tempra2.push(tempra.shift())
                } else if (reaction.emoji.name === '🇨') {
                    //move a to main, place c in mid
                    gameData["channels"][supermessage.channel.id].cards.push(gameData["channels"][supermessage.channel.id].players[playerNumber].cards[cardspace])
                    gameData["channels"][supermessage.channel.id].players[playerNumber].cards[cardspace] = tempra[1]
                    tempra2.push(tempra.pop())
                } else {

                }

                //end
                for (let x = 0; x < tempra.size; x++) {
                    gameData["channels"][supermessage.channel.id].cards.push(tempra[x])
                }
                for (let x = 0; x < tempra2.size; x++) {
                    gameData["channels"][supermessage.channel.id].cards.push(tempra2[x])
                }

                functions.sendMessage(supermessage.channel, userData[gameData["channels"][supermessage.channel.id].players[playerNumber].id].username + " has finished Ambassing.")
                //end turn
                //Next Turn counter
                if (functions.nextTurn(supermessage) == false) {
                    //game ends
                    functions.sendMessage(supermessage.channel, userData[gameData["channels"][supermessage.channel.id].players[playerNumber].id].username + "Wins!");
                    return
                }

                //set Gameboard
                functions.getGameboard(supermessage)
            })
            .catch(collected => {
                //end
                for (let x = 0; x < tempra.size; x++) {
                    gameData["channels"][supermessage.channel.id].cards.push(tempra[x])
                }

                functions.sendMessage(supermessage.channel, userData[gameData["channels"][supermessage.channel.id].players[playerNumber].id].username + " has finished Ambassing.")
                //end turn
                //Next Turn counter
                if (functions.nextTurn(supermessage) == false) {
                     //game ends
                    functions.sendMessage(supermessage.channel, userData[gameData["channels"][supermessage.channel.id].players[playerNumber].id].username + "Wins!");
                    return
                }

                //set Gameboard
                functions.getGameboard(supermessage)
            });


    }).catch(function (err) {
        console.error(err)
    })
}