var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (userData[id].consum.box == undefined) {
        return;
    }
    let amount = 1
    if (words[1] == undefined) {
        amount = 1
    }
    else if (words[1].toUpperCase() != `ALL`) {
        amount = parseInt(words[1])
        if ((isNaN(amount) || amount < 1)) { return functions.replyMessage(message, "Please specify a valid amount!") }
    } else {
        amount = userData[id].consum.box
        if (amount == 0) {
            functions.replyMessage(message, "You have no boxes!")
            return
        }
    }
    if (userData[id].consum.box < amount) {
        functions.replyMessage(message, "You don't have enough boxes (You have " + userData[id].consum.box + "), silly! Get them by voting or buy them in the shop!")
        return;
    }
    functions.consumGive(id, "box", -1 * amount);
    let text = "You opened " + amount + " boxes and got:\n"
    text +=functions.craftItems(message, -1, -1, amount)
    if (amount != 1) { functions.replyMessage(message, text) }
}