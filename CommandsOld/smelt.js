module.exports = function (message) {
    //functions.sendMessage(message.channel, "HP: " + userData[id].hp)
    let words = message.content.split(/\s+/)
    id = message.author.id;
    if (userData[id].status == 0) {
        functions.sendMessage(message.channel, "<@" + id + "> has not created an account.")
        return
    }
    if (words.length == 1) {
        functions.replyMessage(message, "Choose an weapon id to smelt. (`!smelt [weaponid]`)")
        return
    }
    let weaponid = Math.floor(words[1].toLowerCase())
    if (weaponid == "none" || weaponid == -1) {
        functions.replyMessage(message, "Choose an weapon id to smelt. (`!smelt [weaponid]`)")
        return
    } else if (weaponData[weaponid] == undefined) {
        if (userData[id].inventory[weaponid] == weaponid) {
            delete userData[id].inventory[weaponid]
        }
        functions.replyMessage(message, "This weapon does not exist.");
        return
    } else if (userData[id].weapon == weaponid) {
        functions.replyMessage(message, "You cannot smelt a weapon that is currently equipped.")
        return
    } else if (userData[id].inventory[weaponid] == undefined) {
        functions.replyMessage(message, "You do not own any weapon with the id " + weaponid + ".")
        return
    }
    if (userData[id].inventory[weaponid] == weaponid) {
        //userData[id].weapon = weaponid
        let converted = weaponData[weaponid].attack
        if (Math.floor((weaponData[weaponid].type - 1) / 3 - 1) == 1) {
            converted += 2
        } else if (Math.floor((weaponData[weaponid].type - 1) / 3) == 2 || weaponData[weaponid].type == 10) {
            converted += 4
        }
        let rew = converted
        let name = weaponData[weaponid].name
        functions.addmoney(message, rew)
        functions.addxp(message, rew * 2)
        delete userData[id].inventory[weaponid]
        delete weaponData[weaponid]
        let cmc = Math.floor((converted - 7) / 2)
        if (cmc > 4) { cmc = 4 }
        roll = Math.floor(Math.random() * Math.pow(5 - cmc, 1.5))
        if (roll < 1) { roll = 1 }
        //console.log(cmc)
        functions.sendMessage(message.channel, "You have smelted **" + name + "** (" + weaponid + ") for $" + rew + " and " + display.givematerial(id, cmc, roll) + ".")
    }
}