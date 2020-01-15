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
    functions.sendMessage(message.channel, {
        "embed": {
            "title": "Profile",
            //"description": "Here is your spell inventory\nUse `!cast [ID_of_Item]` to cast you spell... yeah \n",
            "color": 13498074,
            "thumbnail": {
                url: userData[target].avy
            },
            "fields": [
                {
                    "name": "Rank",
                    "value": "-1",
                    "inline": true
                },
                {
                    "name": "Wins",
                    "value": userData[id].wins,
                    "inline": true
                },
            ]
        }
    })
}
