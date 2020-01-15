module.exports = function (message) {
    //functions.sendMessage(message.channel, "HP: " + userData[id].hp)
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
        functions.sendMessage(message.channel, "<@" + target + "> has not created an account.");
        return;
    }
    //---------------

    player = userData[target]
    let infoText = "";
    infoText += "Lvl. " + player.level + " - " + classList[Math.floor(player.class)] + " " + subclassList[Math.floor((player.class * 10) % 10)] + "\n"
    let sr = player.sr
    let rank = "G"
    if (sr < 99) {
        rank = "F"
    } else if (sr <= 499) {
        rank = "E"
    } else if (sr <= 999) {
        rank = "D"
    } else if (sr <= 1499) {
        rank = "C"
    } else if (sr <= 1999) {
        rank = "B"
    } else if (sr <= 2499) {
        rank = "A"
    } else if (sr <= 2999) {
        rank = "S"
    } else if (sr <= 3499) {
        rank = "X"
    } else if (sr <= 4999) {
        rank = "Y"
    } else {
        rank = "Z"
    }
    infoText += "Ranking: `" + player.sr + " sr` (" + rank + " Rank) \n"
    infoText += "Money: `" + player.money + "`\n"
    if (player.status == 3) {
        if (ts > player.cd["Adventure"]) {
            player.status = 4
        }
    }
    if (player.level != 40) {
        infoText += "XP: `" + player.xp + "/" + (player.level) * 100 + "` (" + (((player.level) * 100) - player.xp) + " until next level) \n"
    } else {
        infoText += "XP: `0/1` (MAX Level) \n"
    }
    let statusText = "`" + statusList[player.status] + "`\n"
    //let classColor = [0xffffff, 0xff0000, 0x00ff11, 0x2b6eff, 0xff9c11, 0xff3898, 0xffff00, 0xcccccc, 0xffd000, 0x000000];
    let classInt = Math.floor(player.class)

    pages = []
    page1 = {
        embed: {
            color: classColor[classInt],
            thumbnail: {
                url: player.avy
            },
            fields: [
                {
                    name: "" + player.username + "'s Info",
                    value: infoText,
                    inline: false
                }, {
                    name: "" + player.username + "'s Status",
                    value: statusText
                }
            ],
            footer: {
                text: "Page 1 of 3"
            }
        }
    }
    infoText = ""
    infoText += "Level `" + player.level + "`\n"
    infoText += "Class: `" + classList[Math.floor(player.class)] + " " + subclassList[Math.floor((player.class * 10) % 10)] + "`\n"
    let type = "None";
    if (classInt == 1 || classInt == 4 || player.class == 7) {
        type = "Physical"
    } else if (classInt == 2 || classInt == 5 || classInt == 8) {
        type = "Magical"
    } else if (classInt == 3 || classInt == 6 || classInt == 9) {
        type = "Dual"
    }
    infoText += "Attack Type: `" + type + "`\n\n"
    infoText += "**" + functions.calcStat(target, "hp") + "** Health\n"
    infoText += "**" + functions.calcStat(target, "atk") + "** Attack\n"
    infoText += "**" + functions.calcStat(target, "spd") + "** Speed\n"
    infoText += "**" + functions.calcStat(target, "def") + "** Defense\n"
    infoText += "**" + functions.calcStat(target, "res") + "** Resistance\n"
    infoText += "**" + functions.calcStat(target, "total") + "** Total Stats\n"
    page2 = {
        embed: {
            color: classColor[classInt],
            thumbnail: {
                url: player.avy
            },
            fields: [
                {
                    name: "" + player.username + "'s Stats",
                    value: infoText,
                    inline: false
                }
            ],
            footer: {
                text: "Page 2 of 3"
            }
        }
    }
    infoText = ""
    if (player.weapon == -1) {
        let boost = 0
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
        let type = "Stick"

        if (classInt == 1) {
            type = "Sword"
        } else if (classInt == 2) {
            type = "Gauntlet"
        } else if (classInt == 3) {
            type = "Spear"
        } else if (classInt == 4) {
            type = "Bow"
        } else if (classInt == 5) {
            type = "Tome"
        } else if (classInt == 6) {
            type = "Staff"
        } else if (classInt == 7) {
            type = "Rifle"
        } else if (classInt == 8) {
            type = "Orb"
        } else if (classInt == 9) {
            type = "Aura"
        } else {
            type = "Stick"
        }
        infoText += "**Broken " + type + "**\n"
        infoText += "Atk +" + boost + ".\n"
        infoText += "*A broken " + type + " that's probably just trash... How exactly do you plan to use this?*\n"
    } else {
        infoText += display.displayWeaponText(player.weapon)
    }
    let skillText = ""
    skillText += "**Skill A**\n"
    if (player.skillA == -1) {
        skillText += "None\n\n"
    } else {
        skillText += skillData[player.skillA].name + "(" + player.skillA + ")\n"
        if (weaponData[player.weapon].description.length != undefined) {
            skillText += "*" + skillData[player.skillA].description + "*\n"
        }
        skillText += "\n"
    }
    skillText += "**Skill B**\n"
    if (player.skillB == -1) {
        skillText += "None\n\n"
    } else {
        skillText += skillData[player.skillB].name + "(" + player.skillB + ")\n"
        if (weaponData[player.weapon].description.length != undefined) {
            skillText += "*" + skillData[player.skillB].description + "*\n"
        }
        skillText += "\n"
    }
    skillText += "**Skill C**\n"
    if (player.skillC == -1) {
        skillText += "None\n\n"
    } else {
        skillText += skillData[player.skillC].name + "(" + player.skillC + ")\n"
        if (weaponData[player.weapon].description.length != undefined) {
            skillText += "*" + skillData[player.skillC].description + "*\n"
        }
        skillText += "\n"
    }
    page3 = {
        embed: {
            color: classColor[classInt],
            thumbnail: {
                url: player.avy
            },
            fields: [
                {
                    name: "" + player.username + "'s Equipment",
                    value: infoText + "\n", //+ skillText,
                    inline: false
                }
            ],
            footer: {
                text: "Page 3 of 3"
            }
        }
    }
    pages.push(page1)
    pages.push(page2)
    pages.push(page3)
    new functions.Paginator(message.channel, message.author, pages)
}