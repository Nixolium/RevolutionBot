var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let text = ""
    if (functions.calcTime(userData[id].cooldowns.work, ts) > 0) {
        functions.replyMessage(message, "More work will be available in " + functions.displayTime(userData[id].cooldowns.work, ts))
        functions.deleteMessage(message);
        return;
    }
    if (userData[id].dead === true) {
        functions.replyMessage(message, "Corpses can\'t work! Do !resurrect");
        functions.deleteMessage(message);
        return;
    }
    let earnings = Math.floor((-4 * ((Math.random() - 0.5) ** 2) + 1) * (Math.sqrt(userData[id].level) * 50 + 1));
    if (userData[id].triangleid == 7) {
        earnings = Math.floor(earnings * 2);
    }
    earnings *= functions.calcLuckyBuff(id)
    earnings = Math.floor(earnings)
    userData[id].xp += earnings;
    userData[id].money += earnings;
    functions.setCD(id, ts, workcdseconds, "work")
    text += message.author.username + ' worked for ' + earnings + ' money and xp!'
    if (userData[id].marry != "None") {
        let spouse = userData[id].marry;
        userData[spouse].money += earnings;
        text += " Your spouse, " + userData[userData[id].marry].username + ", also earned $" + earnings + "!"
        /*if (id == "238763232096026624") {
          text += "Your " + userData[userData[id].marry].username + " also earned $" + earnings + "!"; 
        } else if (id == "546875053954826241") {
        text = "Elsa and "  + userData[userData[id].marry].username + " would like @Nix to go away. They also made $" + earnings + "."
        } else {
          text += "Your spouse, " + userData[userData[id].marry].username + ", also earned $" + earnings + "!"
        }*/
    }

    if (Math.random() > 1) {
        functions.sendMessage(message.channel, "TEST")
        let a = Math.floor(Math.random() * 100)
        let b = Math.floor(Math.random() * 100)
        let c = Math.floor(Math.random() * 100)
        let d = a + b + c
        new functions.MessageAwait(message.channel, id, "Answer the following question to recieve a bonus! What is " + a + " + " + b + " + " + c + "?", d, function (response, extraArgs) {

            let special = 10 * Math.floor((-4 * ((Math.random() - 0.5) ** 2) + 1) * (Math.sqrt(userData[id].level) * 50 + 1));

            functions.replyMessage(message, "You earned $" + special + "!")
        }, [message, id]);
    }
    userData[id].speed = 0;
    functions.deleteMessage(message);

    functions.sendMessage(message.channel, text)
}
