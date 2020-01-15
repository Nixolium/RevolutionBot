module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    functions.sendMessage(message.channel, display.givematerial(id, 0, 1) + " was given.");
}