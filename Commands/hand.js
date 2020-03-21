module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let target = id;
    let ts = message.createdTimestamp;
    if (words.length == 1) {
        //target = message.author.id;
    } else {
        target = functions.validate(message)
        if (target == false) {
            return;
        }
    }
    if (userData[target].status == 0) {
        functions.sendMessage(message.channel, "Ascella does not know <@" + target + ">.");
        return;
    }
    if (gameData["channels"][message.channel.id] == undefined){
        functions.sendMessage(message.channel, "There is not currently a game ongoing.");
        return;
    }
    cardsInHandText = "cint text"
    centerCardText = "centre text"
    functions.sendMessage(message.channel, {
        "embed": {
            "title": "Your Cards",
            //"description": "Here is your spell inventory\nUse `!cast [ID_of_Item]` to cast you spell... yeah \n",
            "color": 13498074,
            "thumbnail": {
                url: userData[target].avy
            },
            "fields": [
                {
                    "name": "Center Card",
                    "value": centerCardText,
                    "inline": true
                },
                {
                    "name": "Cards in Hand",
                    "value": cardsInHandText,
                    "inline": true
                },
            ],
            "footer": {
                "text": "Game ID: " + message.channel.id
            }
        }
    })
}
