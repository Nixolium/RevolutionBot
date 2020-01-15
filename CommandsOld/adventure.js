module.exports = function (message) {
    //functions.sendMessage(message.channel, "HP: " + userData[id].hp)
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let totalStat = (functions.calcStat(id, "hp") + functions.calcStat(id, "atk") + functions.calcStat(id, "spd") + functions.calcStat(id, "def") + functions.calcStat(id, "res"))
    let adventureStats = [0, 5, 10, 20, 40, 60, 80, 100, 125, 160, 200]
    if (userData[id].status == 0) { return; }
    if (userData[id].status == 3) {
        if ((userData[id].cd) != undefined && ts > userData[id].cd["Adventure"]) {
            userData[id].status == 4
        }
    }
    if (words.length == 1) {
        infoText = "Go on adventures to earn money, gain xp, and even find weapons. To begin an adventure, type `adventure [1-10]`. "
        infoText += "Use `adventure complete` to collect your rewards for a finished adventure.\n\n"
        if (userData[id].status == 3) {
            infoText += "<@" + id + ">'s adventure currently has " + display.timeCalc(userData[id].cd["Adventure"] - ts) + " before completion.\n\n"
        } else if (userData[id].status == 4) {
            infoText += "<@" + id + ">'s adventure currently has already been completed. Use `adventure complete` to collect your reward.\n\n"
        } else {
            infoText += "Adv. 1 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[1] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 2 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[2] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 3 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[3] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 4 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[4] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 5 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[5] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 6 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[6] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 7 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[7] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 8 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[8] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 9 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[9] + totalStat)))) / 10 + "%\n"
            infoText += "Adv. 10 Success Rate: " + Math.ceil(1000 * ((totalStat / (adventureStats[10] + totalStat)))) / 10 + "%\n"
        }
        page = {
            embed: {
                color: classColor[Math.floor(userData[id].class)],
                thumbnail: {
                    url: "https://i.imgur.com/iLw2Raz.jpg"
                },
                fields: [
                    {
                        name: "Adventures",
                        value: infoText,
                        inline: false
                    }
                ],
                footer: {
                    text: "Adventure difficulties go from 1 to 10, with 10 being the most difficult.\n"
                }
            }
        }
        functions.sendMessage(message.channel, page)
    } else {
        if (display.checkCooldown(message, "Adventure") == false) { //adventure still going
            userData[id].status = 3
            return;
        }
        let adv = words[1].toUpperCase()
        if (adv == `COMPLETE` || adv == `COLLECT`) {
            if (userData[id].adventure == 0) {
                functions.replyMessage(message, "You are not currently on an adventure.")
                return;
            }

            let chance = totalStat / (adventureStats[userData[id].adventure] + totalStat)
            if ((Math.random() > chance || Math.random() > chance) && chance < .89) { //kindness :P If >92% success, it's going to be 100% success  
                functions.replyMessage(message, "You died on the adventure. Try again. :(")
            } else {
                //Rewards
                display.adventureReward(message)
            }
            userData[id].status = 1
            userData[id].adventure = 0
            return
        }
        if (isNaN(adv) || adv > 10 || adv < 1 || adv.length > 2) {
            functions.replyMessage(message, "Choose a real adventure. Adventures go from 1 to 10, with 10 being the most difficult.")
            return
        }
        if (userData[id].adventure != 0) {
            functions.replyMessage(message, "You are currently on an adventure. Complete your current one first!")
            return
        }
        userData[id].adventure = parseInt(adv)
        userData[id].status = 3
        display.setCooldown(message, "Adventure", (adventureStats[adv] * 180))
        functions.replyMessage(message, "You have embarked upon adventure " + adv + "!")
    }
}