function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
function sendMessage(channel, text, override) {
    //console.time("Message Send")
    override = (override == true) ? true : false
    if (!override && channel.guild != undefined && serverData[channel.guild.id] != undefined && serverData[channel.guild.id].disabledChannels.indexOf(channel.id) != -1) { return; }
    if (channel.type != "dm" && channel.type != "group" && (channel.memberPermissions(bot.user) != null && !channel.memberPermissions(bot.user).has("SEND_MESSAGES"))) { return }
    channel.send(text).catch(function (err) {
        console.error(err)
    })
    //console.timeEnd("Message Send")
}
function replyMessage(message, text, override) {
    //console.time("Message Send")
    override = (override == true) ? true : false
    if (!override && message.channel.guild != undefined && serverData[message.guild.id] != undefined && serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) != -1) { return; }
    if (message.channel.type != "dm" && message.channel.type != "group" && message.channel.memberPermissions(bot.user) != null && !message.channel.memberPermissions(bot.user).has("SEND_MESSAGES")) { return }
    message.channel.send("<@" + message.author.id + ">, " + text).catch(function (err) {
        console.error(err)
    })
    //console.timeEnd("Message Send")
}
function deleteMessage(message) {
    if (message.channel.guild != undefined && serverData[message.guild.id] != undefined && serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) != -1) { return; }
    if (!message.deletable) { return }
    message.delete().catch(function (err) {
        console.error(err)
    })
}

function dmUser(user, text) {
    if (user == bot.id || bot.users.get(user) == undefined) { return }
    if (userData[user].dmmute != true) bot.users.get(user).send(text).catch(function (err) { console.error(err) })
}

function writeData(folder) {
    fs.writeFile(folder + '/userData.json', JSON.stringify(userData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); /*errorlog("Filewrite error, see console.")*/ })//.then(sendMessage(message.channel,"userData backed up!"))
    //fs.writeFile(folder + '/weaponData.json', JSON.stringify(weaponData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); })
    //fs.writeFile(folder + '/guildData.json', JSON.stringify(guildData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); })
    //fs.writeFile(folder + '/skillData.json', JSON.stringify(skillData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); })
    fs.writeFile(folder + '/serverData.json', JSON.stringify(serverData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); })
    fs.writeFile(folder + '/devData.json', JSON.stringify(devData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); })
    //fs.writeFile(folder + '/mapData.json', JSON.stringify(mapData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); })
    //fs.writeFile(folder + '/battleData.json', JSON.stringify(battleData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); })
    fs.writeFile(folder + '/gameData.json', JSON.stringify(gameData, null, 4), function (err) { if (err == null) { return; }; console.log("Filewrite Error"); console.log(err); })
}



function validate(message, spot) {
    if (isNaN(parseInt(spot))) { spot = 1 }
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        sendMessage(message.channel, "Choose a target!")
        return false;
    }
    let target = words[spot];
    let targetname = words[spot];
    if (target.startsWith('<@') && target.endsWith('>')) {
        target = target.slice(2, -1);
    }
    if (target.startsWith('!')) {
        target = target.slice(1);
    }
    let temptarget = undefined
    if (target.slice(target.length - 5).startsWith("#")) {
        //replyMessage(message,"Ran")
        temptarget = bot.users.find(val => val.discriminator == target.slice(target.length - 4) && val.username == target.slice(0, target.length - 5));
    } else {
        temptarget = bot.users.find(val => val.username == target)
    }
    if (temptarget != undefined) {
        target = temptarget.id
        targetname = temptarget
    }
    if (userData[target] == undefined) {
        //Send fail message here
        sendMessage(message.channel, targetname + " is not an existing user.");
        return false;
    }

    return target
}
function checkProps(message) {
    let id = message.author.id
    let ts = message.createdTimestamp;
    //let player = userData[id];
    if (!userData[id]) userData[id] = {} //creates profile if none exists
    if (!userData[id].id) userData[id].id = id
    if (!userData[id].wins) userData[id].wins = 0
    if (!userData[id].losses) userData[id].losses = 0
    if (!userData[id].avy || Math.random() > 0.999) userData[id].avy = message.author.avatarURL;
    /*
    if (userData[id].username != message.author.username) userData[id].username = message.author.username;
    if (!userData[id].avy || Math.random() > 0.9) userData[id].avy = message.author.avatarURL;*/

    //Creates object with name as username
}
function checkStuff(message) {
    let id = message.author.id
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    checkProps(message)
    //writeData("Storage")
}

function calcStat(id, stat) {
    if (userData[id] == undefined) {
        return;
    }
    let statName = stat.toLowerCase()
    let statVal = 0;
    if (userData[id][statName] != undefined) {
        statVal = userData[id][statName];
    }
    let classInt = Math.floor(userData[id].class)
    if (statName == `hp`) {

    } else if (statName == `atk`) {
        let boost = 0
        if (userData[id].weapon == -1) {

            if (classInt == 1 || classInt == 2) {
                boost = 7
            } else if (classInt == 3) {
                boost = 6
            } else if (classInt == 4 || classInt == 5) {
                boost = 5
            } else if (classInt == 6) {
                boost = 4
            } else if (classInt == 7 || classInt == 8) {
                boost = 3
            } else if (classInt == 9) {
                boost = 2
            }
        } else {
            boost = weaponData[userData[id].weapon].attack
        }
        statVal += boost;
    } else if (statName == `spd`) {

    } else if (statName == `def`) {

    } else if (statName == `res`) {

    } else if (statName == `total`) {
        statVal = (calcStat(id, "hp") + calcStat(id, "atk") + calcStat(id, "spd") + calcStat(id, "def") + calcStat(id, "res"))
        return statVal;
    }
    if (statVal < 0) {
        statVal = 0
    }
    return statVal
}

function addxp(message, xp) {
    id = message.author.id
    if (userData[id].level == 40) {
        return;
    }
    if (!userData[id].xp) { userData[id].xp = 0 }
    userData[id].xp += xp
    levelCheck(id)
    return xp
}
function levelCheck(id) {
    if (userData[id].xp >= userData[id].level * 100) {
        userData[id].level += 1;
        userData[id].xp = 0;
        let textTop = "You leveled up to level " + userData[id].level + "!\n"
        let oldhp = userData[id].hp
        let oldatk = userData[id].atk
        let oldspd = userData[id].spd
        let olddef = userData[id].def
        let oldres = userData[id].res
        let classInt = Math.floor(userData[id].class)
        let starter = 0;
        if (classInt == 1 || classInt == 2) {
            starter = 158
        } else if (classInt == 3) {
            starter = 154
        } else if (classInt == 4 || classInt == 5) {
            starter = 148
        } else if (classInt == 6) {
            starter = 144
        } else if (classInt == 7 || classInt == 8) {
            starter = 138
        } else if (classInt == 9) {
            starter = 134
        }

        let subclassInt = Math.floor((userData[id].class * 10) % 10)
        subclassMod = 0
        if (subclassInt == 0) {
            subclassMod = 0
        } else if (subclassInt == 1) {
            if (classInt == 1 || classInt == 2 || classInt == 3) {
                subclassMod = 4
            } else if (classInt == 4 || classInt == 5 || classInt == 6) {
                subclassMod = 2
            } else {
                subclassMod = 0
            }
        } else if (subclassInt == 2) {
            subclassMod = 8
        } else if (subclassInt == 3) {
            subclassMod = -8
        } else if (subclassInt == 4) {
            subclassMod = -8
        } else if (subclassInt == 5) {
            subclassMod = 3
        }
        let statTotal = Math.ceil(((starter + subclassMod) - (oldhp + oldatk + oldspd + olddef + oldres)) / (41 - userData[id].level))

        for (statTotal; statTotal > 0; statTotal--) {
            roll = Math.random()
            if (roll < .25) {
                userData[id].hp += 1
            } else if (roll < .50) {
                userData[id].atk += 1
            } else if (roll < .66) {
                userData[id].spd += 1
            } else if (roll < .83) {
                userData[id].def += 1
            } else {
                userData[id].res += 1;
            }
        }
        let text = ""
        if (userData[id].hp > oldhp) {
            text += "HP  " + oldhp + " => **" + userData[id].hp + "**\n"
        } else {
            text += "HP  " + oldhp + " => " + userData[id].hp + "\n"
        }
        if (userData[id].hp > oldatk) {
            text += "Atk  " + oldatk + " => **" + userData[id].atk + "**\n"
        } else {
            text += "Atk  " + oldatk + " => " + userData[id].atk + "\n"
        }
        if (userData[id].spd > oldspd) {
            text += "Spd  " + oldspd + " => **" + userData[id].spd + "**\n"
        } else {
            text += "Spd  " + oldspd + " => " + userData[id].spd + "\n"
        }
        if (userData[id].def > olddef) {
            text += "Def  " + olddef + " => **" + userData[id].def + "**\n"
        } else {
            text += "Def  " + olddef + " => " + userData[id].def + "\n"
        }
        if (userData[id].res > oldres) {
            text += "Res  " + oldres + " => **" + userData[id].res + "**\n"
        } else {
            text += "Res  " + oldres + " => " + userData[id].res + "\n"
        }
        //let classColor = [0xffffff, 0xff0000, 0x00ff11, 0x2b6eff, 0xff9c11, 0xff3898, 0xffff00, 0xcccccc, 0xffd000, 0x000000];
        page = {
            embed: {
                color: classColor[Math.floor(userData[id].class)],
                fields: [
                    {
                        name: textTop,
                        value: text,
                        inline: false
                    }
                ],
            }
        }
        dmUser(id, page)
        if (userData[id].level == 20) {
            if (userData[id].asc == 1) {
                dmUser(id, "You unlocked the Spellblade and the Sorcerer classes and the Healer, Tank, and Rider subclasses!")
            } else if (userData[id].asc == 2) {
                dmUser(id, "You unlocked the Sniper and Oracle classes and the Dancer subclass!")
            } else if (userData[id].asc == 3) {
                dmUser(id, "You unlocked the Kinetic class and the Legend subclass! (All roles have been unlocked)")
            }
            userData[id].asc += 1;
        }
    }
}

function addmoney(message, money) {
    let id = message.author.id
    if (!userData[id].money) { userData[id].money = 0 }
    userData[id].money += money
    return money
}

function getprefix(message) {
    let prefix = (message.channel.type == "dm") ? defaultPrefix : serverData[message.guild.id].prefix;
    return prefix
}

module.exports.clean = function (text) { return clean(text) }
module.exports.sendMessage = function (channel, text, override) { return sendMessage(channel, text, override) }
module.exports.replyMessage = function (message, text, override) { return replyMessage(message, text, override) }
module.exports.deleteMessage = function (message) { return deleteMessage(message) }
module.exports.dmUser = function (user, text) { return dmUser(user, text) }
module.exports.logCommand = function (message, extratext) { return logCommand(message, extratext) }
module.exports.writeData = function (folder) { return writeData(folder) }
module.exports.validate = function (message, spot) { return validate(message, spot) }
module.exports.checkProps = function (message) { return checkProps(message) }
module.exports.checkStuff = function (message) { return checkStuff(message) }
//module.exports.checkBurn = function (message) { return checkBurn(message) }
module.exports.calcStat = function (id, stat) { return calcStat(id, stat) }
module.exports.addxp = function (message, xp) { return addxp(message, xp) }
module.exports.levelCheck = function (id) { return levelCheck(id) }
module.exports.addmoney = function (message, money) { return addmoney(message, money) }
module.exports.getprefix = function (message) { return getprefix(message) }


fs.readdir("./Utils/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        //console.log(file)
        // If the file is not a JS file, ignore it (thanks, Apple)
        if (!file.endsWith(".js") || file == "js") { return };
        // Load the event file itself
        let commandname = file.split(".")[0];
        //console.log(commandname)
        module.exports[commandname] = require(`./${file}`)
        // Get just the event name from the file name
    });
})