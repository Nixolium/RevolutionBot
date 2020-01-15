module.exports = function (message) {
    let words = message.content.split(/\s+/)
    id = message.author.id;
    let target = id;
    if (userData[id].status != 0) {
        functions.replyMessage(message, "You already have a character.")
        return;
    }
    functions.sendMessage(message.channel, "Welcome to Eris, " + userData[id].username + ", a world where you can duel other champions for the favor of the gods.\nChoose a class with `" + defaultPrefix + "class` to begin!")
    functions.checkProps(message)
    userData[id].hp = 10;
    userData[id].atk = 5;
    userData[id].spd = 5;
    userData[id].def = 5;
    userData[id].res = 5;
    userData[id].level = 1;
    userData[id].money = 0;
    userData[id].status = 1;
    userData[id].sr = 0;
    //userData[id].weapon = -1;
    userData[id].class = 0;

    userData[id].asc = 1;

    if (!userData[id].skills) userData[id].skills = {};
    if (!userData[id].skillA) userData[id].skillA = -1;
    if (!userData[id].skillB) userData[id].skillB = -1;
    if (!userData[id].skillC) userData[id].skillC = -1;

    /*
    new functions.MessageAwait(message.channel, id, "Welcome to Eris! To begin, choose a class", "confirm", function (response, extraArgs) {
        
        let id = extraArgs[1]
        let message = extraArgs[0]
        
        
        functions.replyMessage(message, "You have ascended! You now have " + userData[id].consum.sp + " skill points!\n(Note that your weapon has been dequipped. Favorite it before smelting everything!)")
    }, [message, id]);*/
}