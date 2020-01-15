module.exports = function (message) {
    //functions.sendMessage(message.channel, "HP: " + userData[id].hp)
    let words = message.content.split(/\s+/)
    id = message.author.id;
    if (userData[id].status == 0) {
        functions.sendMessage(message.channel, "<@" + id + "> has not created an account.")
        return
    }
    if (words.length == 1) {
        userData[id].weapon = -1
        functions.replyMessage(message, "You have successfully dequipped your weapon.")
        return
    }
    let weaponid = Math.floor(words[1].toLowerCase())
    if (weaponid == "none" || weaponid == -1) {
        userData[id].weapon = -1
        functions.replyMessage(message, "You have successfully dequipped your weapon.")
        return
    } else if (weaponData[weaponid] == undefined) {
        if (userData[id].inventory[weaponid] == weaponid) {
            delete userData[id].inventory[weaponid]
        }
        functions.replyMessage(message, "This weapon does not exist.");
        return
    } else if (userData[id].weapon == weaponid) {
        functions.replyMessage(message, "You already have this weapon equipped.")
        return
    } else if (userData[id].class != 0 && Math.floor(userData[id].class) != weaponData[weaponid].type && weaponData[weaponid].type != 10) {
        functions.replyMessage(message, "You can't equip this item as it is restricted to the " + classList[weaponData[weaponid].type] + " class.")
        return
    }
    if (userData[id].inventory[weaponid] == weaponid) {
        userData[id].weapon = weaponid
        functions.sendMessage(message.channel, "You have equipped **" + weaponData[weaponid].name + "** (" + weaponid + ")")
    }
}