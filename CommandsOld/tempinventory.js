var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    if (userData[id].status == 0){
        return;
    }
    let weaponCount = 0
    let wepsra = []

    for (var weaponid in itemData) {
        if (weaponid != undefined) {
            wepsra.push(weaponid)
            weaponCount += 1;
        }
    }
    wepsra.sort() //what sorts the array. Search up array.sort() on w3schools.
    let numPerPage = 5
    let pages = []
    if (wepsra.length == 0) {
        page = {
            "embed": {
                //"title": "Global Wealth",
                "color": classColor[Math.floor(userData[id].class)],
                "fields": [
                    {
                        "name": "Empty Inventory",
                        "value": "Why don't you go get some weapons?",
                        "inline": true
                    }
                ],
                "footer": {
                    "text": "Page 1 of 1"
                }
            }
        }
    } else {
        let infoText = ""
        let totalText = ""
        for (var i = 0; i <= weaponCount; i += 1) {
            if (i % numPerPage != numPerPage - 1 && i != weaponCount) {
                if (wepsra[i] != undefined) {
                    infoText = ""
                    infoText += "**" + itemData[wepsra[i]].name + "** (" + wepsra[i] + ")\n"
                    infoText += "Rarity: " + itemData[wepsra[i]].rarity
                    infoText += "Atk:`" + itemData[wepsra[i]].attack + "` Def:`" + itemData[wepsra[i]].defense + "`\n"
                    infoText += "\n"
                    totalText += infoText
                }
            } else {
                if (wepsra[i] != undefined) {
                    infoText = ""
                    infoText += "**" + itemData[wepsra[i]].name + "** (" + wepsra[i] + ")\n"
                    infoText += "Rarity: " + itemData[wepsra[i]].rarity
                    infoText += "Atk:`" + itemData[wepsra[i]].attack + "` Def:`" + itemData[wepsra[i]].defense + "`\n"
                    infoText += "\n"
                    totalText += infoText
                }
                if (totalText != "") {
                    page = {
                        "embed": {
                            //"title": "Global Wealth",
                            "color": classColor[Math.floor(userData[id].class)],
                            "fields": [
                                {
                                    "name": userData[id].username + "'s Inventory",
                                    "value": totalText,
                                    "inline": true
                                }
                            ],
                            "footer": {
                                "text": "Page " + (pages.length + 1) + " of " + (1 + Math.floor(weaponCount / 5))
                            },
                        }
                    }
                    pages.push(page)
                    totalText = ""
                }
            }
        }
    }
    new functions.Paginator(message.channel, message.author, pages)
}