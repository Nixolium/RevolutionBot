module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let target = id;
    let ts = message.createdTimestamp;
    let channel = message.channel
    if (gameData["channels"][message.channel.id] == undefined) {
        functions.sendMessage(message.channel, "There is not currently a game ongoing.");
        return;
    }
    functions.getGameboard(message)
}