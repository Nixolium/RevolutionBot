module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let ts = message.createdTimestamp
    //let id = message.author.id
    let prefix = functions.getprefix(message)
    if (devs.indexOf(message.author.id) == -1) {
        functions.sendMessage(message.channel, {
            "embed": {
                "title": "Access Denied",
                "description": "You do not have access to this command.",
                "color": 0xff0000,
            }
        })
        return;
    }
    
    devData = {
        "enable": true,
        "dblenable": true,
        "debugenable": true,
        "defaultPrefix": "$",
        "debugGuildId": "536599503608872961",
        "debugChannelId": "538710109241606154",
        "hardbans": {},
        "admins": [],
        "devs": [
            "522616720515530755",
            "238763232096026624"
        ]
    }

    /*if(!gameData["channels"]) gameData["channels"] = {};
    //if(!gameData["roles"]) gameData["roles"] = [null, "Ambassador", "Assassin", "Captain", "Contessa", "Duke"]
    if(!gameData["roles"]) gameData["roles"] = {};
    gameData.roles[1] = {name: "Ambassador"};
    gameData.roles[2] = {name: "Assassin"};
    gameData.roles[3] = {name: "Captain"};
    gameData.roles[4] = {name: "Contessa"};
    gameData.roles[5] = {name: "Duke"};*/

    gameData = {
        "channels": {
        },
        "roles": [
            {
                "name": "Ambassador"
            },
            {
                "name": "Assassin"
            },
            {
                "name": "Captain"
            },
            {
                "name": "Contessa"
            },
            {
                "name": "Duke"
            }
        ]
    }

    functions.sendMessage(message.channel, {
        "embed": {
            "title": "Run Successfully",
            "description": "You have run `" + message.content + "` successfully",
            "color": 0x008000,
        }
    })
    return
}