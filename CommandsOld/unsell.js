module.exports = function (message) {
    //INCOMPLETE
    let id = message.author.id;
    if (userData[id].status == 0) { return; }
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (words.length != 2) {
        functions.replyMessage(message, "`buy [weaponid]`")
        return
    }

    if (isNaN(words[1])) {
        functions.replyMessage(message, "Choose a real weapon id.")
        return;
    }
    let weaponid = words[1]
    if (weaponData[weaponid] == undefined) {
        if (userData[id].inventory[weaponid] == weaponid) {
            delete userData[id].inventory[weaponid]
        }
        functions.replyMessage(message, "This weapon does not exist.");
        return
    } else if (userData[id].weapon == weaponid) {
        functions.replyMessage(message, "You already have this weapon equipped. (Somehow?!?)")
        return
    } else if (weaponData[weaponid].price == undefined) {
        functions.replyMessage(message, "This item is not for sale.")
        return
    } else if (weaponData[weaponid].ownerid != id) {
        functions.replyMessage(message, "You are not selling this item.")
        return
    }

    //userData[id].money -= parseInt(weaponData[weaponid].price)
    //userData[weaponData[weaponid].ownerid].money += parseInt(weaponData[weaponid].price) //transfer of money
    //weaponData[weaponid].ownerid = id //weapon ownerid transfer
    userData[id].inventory[weaponid] = weaponid //weapon added to inventory
    functions.sendMessage(message.channel, "You removed " + weaponData[weaponid].name + " (" + weaponid + ") from the market.")
    delete weaponData[weaponid].price
}