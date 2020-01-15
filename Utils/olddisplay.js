function makebattle(aid, bid, mapid) {//retuns the battle id
    startingturn = Math.random() > .5
    battleData.current += 1 //recklessly avoids battle id recreation.
    if (battleData.current >= 1000) {//clears once reaching 1000
        battleData.current = 1
    }
    battleid = battleData.current;
    battleData.current += 1;

    battleData[battleid] = {
        "battleid": battleid,
        "aid": aid,
        "bid": bid,
        "mapid": mapid,
        "ahp": userData[aid].hp,
        "apos": 60,//down then right, 0 to 6.
        "bhp": userData[bid].hp,
        "bpos": 06,
        "turn": startingturn //true == a, false == b
    }
    return battleid//retuns the battle id
}

module.exports.makebattle = function (aid, bid, mapid) { return makebattle(aid, bid, mapid) }

function printmap(aid, bid, mapid, ahp, apos, bhp, bpos, turn, message) {
    let target = checkid(aid)
    if (target == false) {
        return "aid is not a functional battle target";
    }
    target = checkid(bid)
    if (target == false) {
        return "aid is not a functional battle target";
    }

    if (turn == true) {
        dir = userData[aid].username.slice(0, 13) + "'s Turn"
    } else {
        dir = userData[bid].username.slice(0, 13) + "'s Turn"
    }
    //Sendabove to battledata
    //
    text = "```"
    for (x = 0; x < 7; x++) {
        for (y = 0; y < 7; y++) {
            if (apos == x * 10 + y) {
                text += "A "
            } else if (bpos == x * 10 + y) {
                text += "B "
            } else {
                if (mapData[mapid].spaces[x][y] == 0) {
                    text += "_ "//Blank space
                } else if (mapData[mapid].spaces[x][y] == 1) {
                    text += "X "
                } else if (mapData[mapid].spaces[x][y] == 2) {
                    text += "🗻"
                } else if (mapData[mapid].spaces[x][y] == 3) {
                    text += "🏠"
                } else {
                    text += mapData[mapid].spaces[x][y]//This goes across each row
                }
            }
            //text += " "//space separator
        }
        if (x == 0) {
            text += "| A | " + userData[aid].username.slice(0, 13) + "\n"
        }
        else if (x == 1) {
            text += "| Lvl " + userData[aid].level + " " + classList[Math.floor(userData[aid].class)] + "\n"
        }
        else if (x == 2) {
            text += "| " + ahp + " / " + userData[aid].hp + " HP\n"
        }
        else if (x == 3) {
            text += "|-----------------\n"//Player b not yet implimented
        }
        else if (x == 4) {
            text += "| B | " + userData[bid].username.slice(0, 13) + "\n"
        }
        else if (x == 5) {
            text += "| Lvl " + userData[bid].level + " " + classList[Math.floor(userData[bid].class)] + "\n"
        }
        else if (x == 6) {
            text += "| " + bhp + " / " + userData[bid].hp + " HP\n"
        }
        else {
            text += "|\n"
        }
    }

    text += "-------[" + dir + "]-------\n"
    text += "```"
    if (message != undefined) {
        text += message
    }

    return text; //This function only returns text to channel
}

module.exports.printmap = function (aid, bid, mapid, ahp, apos, bhp, bpos, turn, message) { return printmap(aid, bid, mapid, ahp, apos, bhp, bpos, turn, message) }
//---------------------------------------------Battle mechanics above
function checkid(id) {
    let target = id
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
        //sendMessage(message.channel, targetname + " is not an existing user.");
        return false;
    }
    if (userData[id].status == 0) { return false; }
    return true
}

module.exports.checkid = function (id) { return checkid(id) }

function profile(channel, target) {  //OLD!!!!
    //let classList = ["Classless", "Warrior", "Archer", "Striker", "Mage", "Spellblade", "Sorcerer", "Sniper", "Oracle", "Kinetic"]
    let statusList = ["Yet to begin their journey...", "Preparing for battle...", "In a game..."]
    player = userData[target]
    let infoText = "";
    infoText += "Lvl. " + player.level + " " + classList[Math.floor(player.class)] + " " + subclassList[Math.floor((player.class * 10) % 10)] + "\n"
    infoText += "Money: `" + player.money + "`\n"
    infoText += "Status: `" + statusList[player.status] + "`\n"
    infoText += "XP: `" + player.xp + "`/`" + (player.level) * 100 + " (`" + ( ((player.level) * 100) - player.xp ) + "` until next level) \n"

    functions.sendMessage(channel, {
        embed: {
            color: 0xF1C40F,
            fields: [
                {
                    name: "" + player.username + " (" + player.sr + " sr)",
                    value: infoText,
                    inline: false
                }
            ]
        }
    });
    return;
}

function checkCooldown(message, cooldown) {
    let id = message.author.id
    let ts = message.createdTimestamp;
    if (!userData[id].cd) {
        userData[id].cd = {}
    }
    if (userData[id].cd[cooldown] == undefined) {
        userData[id].cd[cooldown] = -1; //ts + (time * 1000)
    }
    if (userData[id].cd[cooldown] < ts) {
        return true
    }

    if (cooldown == "Adventure") {
        functions.sendMessage(message.channel, "<@" + id + ">'s adventure currently has " + timeCalc(userData[id].cd[cooldown] - ts) + " before completion.")
    } else {
        functions.sendMessage(message.channel, "<@" + id + ">'s " + cooldown + " cooldown currently has " + timeCalc(userData[id].cd[cooldown] - ts) + " left.")
    }
    return false
}

function timeCalc(time) {
    let seconds = Math.ceil(time / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    minutes = minutes % 60
    seconds = seconds % 60
    return ("`" + hours + "h:" + minutes + "m:" + seconds + "s`")
}

function setCooldown(message, cooldown, time) {
    let id = message.author.id
    let ts = message.createdTimestamp;
    if (!userData[id].cd) {
        userData[id].cd = {}
    }
    userData[id].cd[cooldown] = ts + (time * 1000)
}

function generateWeaponText(weaponid) {
    return
    //removed
    let infoText = ""

    infoText += "**" + weaponData[weaponid].name + "**\n"
    infoText += "Atk +" + weaponData[weaponid].attack + ". " + weaponData[weaponid].ability + "\n"
    if (weaponData[weaponid].description.length != undefined) {
        infoText += "*" + weaponData[weaponid].description + "*"
    }
    return infoText
}

function skillToAbility(skills) {
    let returnText = ""
    for (i = 0; i < skills.length; i++) {
        returnText += skillData[skills[i]].description
    }
    return returnText
}

function generateWeapon(ownerid, name, attack, type, description, skill) {
    let newWeapon = new functions.weapon(ownerid, name, attack, type, description, skill)
    weaponData[newWeapon.getid()] = newWeapon;
    userData[ownerid].inventory[newWeapon.getid()] = newWeapon.getid();
    return newWeapon.getid()
}
//go to weapon.js

function displayWeaponText(id) {
    let infoText = ""
    infoText += "**" + weaponData[id].name + "** (" + weaponData[id].id + ")\n"
    infoText += "Atk +" + weaponData[id].attack + ". " + weaponData[id].ability + ""
    if (weaponData[id].type != 10 && weaponData[id].type != undefined) {
        infoText += " [" + classList[weaponData[id].type] + " Only]"
    }
    infoText += "\n"
    if (weaponData[id].description != undefined && weaponData[id].description.length > 0) {
        infoText += "*" + weaponData[id].description + "*\n"
    }
    if (weaponData[id].price != undefined) {
        infoText += "**Cost: $" + weaponData[id].price + "**\n"
    }
    return infoText
}

function calculateStarter(id) {
    if (userData[id] == undefined || userData[id].class == undefined) {
        return;
    }
    let starter = 30;
    let classInt = Math.floor(userData[id].class)
    let subClassInt = (userData[id].class * 10) % 10
    if (classInt == 1 || classInt == 2) {
        starter = 47
    } else if (classInt == 3) {
        starter = 46
    } else if (classInt == 4 || classInt == 5) {
        starter = 44
    } else if (classInt == 6) {
        starter = 46
    } else if (classInt == 7 || classInt == 8) {
        starter = 41
    } else if (classInt == 9) {
        starter = 40
    }
    return starter
}

function upUntil(id, end) {
    //incomplete
    return
    let a = functions.calcStat(id, "total")
    console.log(a + "!")
    if (end < a) {
        return
    }
    while (end > a) {
        roll = Math.random()
        console.log(a)
        if (roll > .8) {
            userData[id].hp += 1
        } else if (roll > .6) {
            userData[id].atk += 1
        } else if (roll > .4) {
            userData[id].spd += 1
        } else if (roll > .2) {
            userData[id].def += 1
        } else {
            userData[id].res += 1;
        }
        a += 1
    }
}

function duel(id1, id2) {// true means id 1 win, false means id 2
    if (Math.random() < 0.05) { //5% chance of random upset
        return (Math.random() > 0.5)
    }
    a = userData[id1]
    b = userData[id2]
    ahits = attacksNeeded(id1, id2)
    bhits = attacksNeeded(id2, id1)

    let range = 1 + Math.floor((a.class - 1) / 3);
    let subclassInt = Math.floor((a.class * 10) % 10)
    let subclassMod = 0;
    if (subclassInt == 2) {
        subclassMod = -1
    } else if (subclassInt == 3 || subclassInt == 4) {
        subclassMod = 1
    }
    let apriority = range + subclassMod
    range = 1 + Math.floor((b.class - 1) / 3);
    subclassInt = Math.floor((b.class * 10) % 10)
    subclassMod = 0;
    if (subclassInt == 1 || subclassInt == 2) {
        subclassMod = -1
    } else if (subclassInt == 3 || subclassInt == 4) {
        subclassMod = 1
    }
    let bpriority = range + subclassMod
    //return "hello:  " + ahits + " " + bhits + " "
    if (ahits > bhits) {
        return true
    } else if (bhits > ahits) {
        return false
    } else {
        if (apriority > bpriority) {
            return true
        } else if (bpriority > apriority) {
            return false
        } else {
            return (Math.random() > 0.5)
        }
    }
}

function attacksNeeded(alpha, beta) {
    a = userData[alpha]
    b = userData[beta]
    let hits = 0
    let damage = 0
    classInt = Math.floor(a.class);
    if (classInt % 3 == 1) {
        damage = (a.atk - b.def)
    } else if (classInt % 3 == 2) {
        damage = (a.atk - b.res)
    } else {
        damage = Math.max((a.atk - b.def), (a.atk - b.res))
    }
    if (damage <= 0) {
        damage = 1;
    }
    if (a.spd - 5 >= b.spd) {
        damage *= 2
    }
    let random = Math.floor((16 * Math.pow((Math.random() - .5), 3)) + .5)
    hits = Math.ceil(b.hp / damage)
    return hits + random
}

function adventureReward(message) {
    let id = message.author.id
    let adv = userData[id].adventure
    let xp = adv * 20
    let money = adv * 5
    functions.addmoney(message, money)
    functions.addxp(message, xp)
    let text = "You earned $" + money + " and " + xp + " xp. "

    let classInt = Math.floor(userData[id].class)
    let roll2 = Math.random()
    if (roll2 > .75) {
        let attack = 9
        if (classInt == 1 || classInt == 2 || classInt == 3) {
            attack = attack
        } else if (classInt == 4 || classInt == 5 || classInt == 6) {
            attack -= 2
        } else {
            attack -= 4
        }
        let roll = Math.random() + 1
        if (adv * roll > 4) {
            attack += 2
        }
        if (adv * roll > 9) {
            attack += 2
        }
        if (adv * roll > 14) {
            attack += 2
        }
        weaponid = display.generateWeapon(id, -1, attack, -1, -1, -1)
        text += "You also found **" + weaponData[weaponid].name + "** with +" + attack + " Atk."
    } else if (roll2 > .25) {
        if (adv <= 3) {
            givematerial(id, 0, Math.ceil(Math.random() * 4));
        } else if (adv <= 6) {
            givematerial(id, 1, Math.ceil(Math.random() * 3));
        } else if (adv <= 9) {
            givematerial(id, 2, Math.ceil(Math.random() * 2));
        } else {
            givematerial(id, 3, 1);
        }
    }
    functions.replyMessage(message, text)
}

function battlewin(winnerid, loserid) {
    if (Math.abs(userData[winnerid].sr - userData[loserid].sr) > 500) {
        return 0;
    }
    let m = [999, 70, 60, 51, 42, 34, 27, 21, 16, 12, 9]
    let sr = [-1, 99, 499, 999, 1499, 1999, 2499, 2999, 3499, 4999, 5000]
    let q = 0
    while (userData[winnerid].sr >= sr[q]) {
        q++;
        if (q > 10) {
            break;
        }
    }
    let wingain = Math.ceil(m[q] * (1 + (userData[loserid].sr - userData[winnerid].sr) / 501))
    if (userData[winnerid].sr + wingain >= 5000) {
        wingain = 5000 - userData[winnerid].sr;
    }
    userData[winnerid].sr += wingain

    if (userData[loserid].sr > 99) {
        q = 0
        while (userData[winnerid].sr >= sr[q]) {
            q++;
            if (q > 10) {
                break;
            }
        }
        let lossgain = Math.ceil(m[q] * (1 + (userData[winnerid].sr - userData[loserid].sr) / 501))

        if (userData[winnerid].sr - lossgain < 0) {
            lossgain = userData[winnerid].sr;
        }
        userData[loserid].sr -= lossgain
        console.log(lossgain)
    }

    console.log(wingain)
    return wingain;
}

function givematerial(id, type, amount) {
    let materials =
        [["Wood", "Stone", "Iron"], //basic
        ["Blood", "Oil", "Glass"], //common
        ["Diamond", "Silver", "Gold", "Ruby", "Crystal"], //rare
        ["Amethyst"], //epic
        ["Arklite", "Nihilite"]] //legendary
    if (!isNaN(type)) {
        if (materials[type] == undefined) {
            return 0 + " Paradoxes"
        }
        type = materials[type][Math.floor(Math.random() * materials[type].length)]
    }
    if (!userData[id].materials) userData[id].materials = {};
    if (!userData[id].materials[type]) userData[id].materials[type] = 0;
    userData[id].materials[type] += amount;
    return amount + " " + type;
}

module.exports.profile = function (channel, target) { return profile(channel, target) }
module.exports.checkCooldown = function (message, cooldown) { return checkCooldown(message, cooldown) }
module.exports.timeCalc = function (time) { return timeCalc(time) }
module.exports.setCooldown = function (message, cooldown, time) { return setCooldown(message, cooldown, time) }
module.exports.generateWeaponText = function (weaponid) { return generateWeaponText(weaponid) }
module.exports.skillToAbility = function (skills) { return skillToAbility(skills) }
module.exports.generateWeapon = function (ownerid, name, attack, type, description, skill) { return generateWeapon(ownerid, name, attack, type, description, skill) }
module.exports.displayWeaponText = function (id) { return displayWeaponText(id) }
module.exports.calculateStarter = function (id) { return calculateStarter(id) }
module.exports.upUntil = function (id, end) { return upUntil(id, end) }
module.exports.duel = function (id1, id2) { return duel(id1, id2) }
module.exports.adventureReward = function (message) { return adventureReward(message) }
module.exports.battlewin = function (winnerid, loserid) { return battlewin(winnerid, loserid) }
module.exports.givematerial = function (id, type, amount) { return givematerial(id, type, amount) }

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