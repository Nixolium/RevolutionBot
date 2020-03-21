module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let target = id;
    let ts = message.createdTimestamp;
    let channel = message.channel
    playerCount = gameData["channels"][channel.id].players.length
    console.log("target: " + target)
    for (let x = 0; x < playerCount; x++) {
        console.log(gameData["channels"][channel.id].players[x].id)
        let target = gameData["channels"][channel.id].players[x].id
        functions.getHand(message, target)
    }
}