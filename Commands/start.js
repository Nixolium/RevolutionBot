module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let ts = message.createdTimestamp
    let id = message.author.id
    let prefix = functions.getprefix(message)
    let channel = message.channel
    let roles = [1, 2, 3, 4, 5]
    //roles automatically selected for now.
    //Ambassador, Assassin, Captain, Contessa, Duke


    if (words.length > 1) {

        //Help message
        if (words[1].toUpperCase() == "HELP") {
            functions.sendMessage(message.channel, "Play a game of 3-1 Coup with 2-9 players. Use syntax: `" + prefix + "start 4` to start a game with 4 players.")
            return;
        }

        //Game is ongoing!
        /*else if(gameData["channels"][channel.id] != undefined){
            functions.sendMessage(message.channel, "A game is currently ongoing. Please wait until it finishes or play in a different channel.")
            return;
        }*/

        //Game Start
        else if (words[1] >= 2 && words[1] <= 9 && Number.isInteger(parseInt(words[1]))) {
            let playerCount = parseInt(words[1])

            let embedtext = "<@" + id + "> has created a game with " + playerCount + " players!"
            //embedtext += money
            embedtext += "\nReact to join their game of Coup-31!"
            let text = {
                embed: {
                    color: 0xfaa920,
                    thumbnail: {
                        url: message.author.avatarURL
                    },
                    fields: [
                        {
                            name: "⚔ Open Duel Challenge ⚔",
                            value: embedtext,
                            inline: false
                        }
                    ],
                    footer: {
                        text: "All games are judged fairly in the name of Ascella."
                    }
                }
            }

            //places game cannot be made; returned if failed
            if (channel.guild != undefined && serverData[channel.guild.id] != undefined && serverData[channel.guild.id].disabledChannels.indexOf(channel.id) != -1) {
                functions.sendMessage(message.channel, {
                    "embed": {
                        "title": "Error",
                        "description": "Ascella unexpectedly met an error.",
                        "color": 0xff0000,
                    }
                })
                return;
            }
            if (channel.type != "dm" && channel.type != "group" && (channel.memberPermissions(bot.user) != null && !channel.memberPermissions(bot.user).has("SEND_MESSAGES"))) {
                functions.sendMessage(message.channel, {
                    "embed": {
                        "title": "Error",
                        "description": "Ascella unexpectedly met an error.",
                        "color": 0xff0000,
                    }
                })
                return
            }

            channel.send(text).then(function (message) {
                message.react('⚔')//.then(() => message.react('🛑'));

                const filter = (reaction, user) => {// Note, there is no way to leave the game once you're in it.
                    target = user.id
                    targetavy = user.avatarURL
                    if (['⚔'].includes(reaction.emoji.name) && user.id != id && user.id != 666782838259187713) {
                        for (x = 0; x < gameData["channels"][channel.id].players.length; x++) {
                            if (gameData["channels"][channel.id].players[x] == target) {
                                return false;
                            }
                        }
                        functions.sendMessage(message.channel, "<@" + target + "> joined the game")
                        gameData["channels"][channel.id].players[gameData["channels"][channel.id].players.length] = { "id": target, "money": 2, "cards": [0, 0, 0] };
                        return true;
                    } else {
                        return false;
                    }
                };
                //functions.sendMessage(message.channel, "React to begin.")

                //game created in gameData
                gameData["channels"][channel.id] = {}
                gameData["channels"][channel.id].gameType = "Coup-31"
                gameData["channels"][channel.id].players = []
                gameData["channels"][channel.id].players[0] = { "id": id, "money": 2, "cards": [0, 0, 0] };
                gameData["channels"][channel.id].currentTurn = Math.floor(Math.random() * playerCount)
                gameData["channels"][channel.id].cards = [] //cards are shuffled later
                gameData["channels"][channel.id].lastMove = {"action": -1, "player": -1}

                message.awaitReactions(filter, { max: playerCount - 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '⚔') {
                            
                            functions.sendMessage(message.channel, "Game Start")

                            copies = 0
                            if (playerCount = 2 || 3) {
                                copies = 3
                            } else if (playerCount = 4) {
                                copies = playerCount
                            }
                            for (let x = 0; x < copies; x++) {
                                for (let y = 0; y < roles.length; y++) {
                                    gameData["channels"][channel.id].cards.push(roles[y])
                                }
                            }
                            gameData["channels"][channel.id].currentTurn = Math.floor(Math.random() * playerCount)

                            gameData["channels"][channel.id].cards = shuffle(gameData["channels"][channel.id].cards)
                            
                            functions.sendMessage(message.channel, "Cards Shuffled")

                            //Cards are dealt
                            
                            //Center card is revealed
                            
                            //Game board needs to be made now
                            
                            //Turns begin

                        } else {
                            functions.sendMessage(message.channel, "Game Canceled.")
                            return
                        }
                    })
                    .catch(collected => {
                        //functions.sendMessage(message.channel, "No response")
                        //console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                        gameData["channels"][channel.id] = null
                        functions.sendMessage(message.channel, "<@" + id + ">'s battle challenge has timed out.")
                    });


            }).catch(function (err) {
                console.error(err)
            })

            return;
        }

        //Syntax Failure
        else {

            functions.sendMessage(message.channel, {
                "embed": {
                    "title": "Syntax Failure",
                    "description": "Use syntax: `" + prefix + "start X` to start a game with 2-9 players.",
                    "color": 0xff0000,
                }
            })
            return;
        }
    }

    //Something weird happens...?
    functions.sendMessage(message.channel, {
        "embed": {
            "title": "Syntax Failure",
            "description": "Use syntax: `" + prefix + "start X` to start a game with 2-9 players.",
            "color": 0xff0000,
        }
    })
    return
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}