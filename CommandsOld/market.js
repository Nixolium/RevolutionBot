module.exports = function (message) {

    let id = message.author.id;
    if (userData[id].status == 0) { return; }
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)

    if (words[1] != undefined && words[1].toUpperCase() == `HELP`) {
        let page = {
            "embed": {
                "color": 0x458B00,
                "fields": [
                    {
                        "name": "Tekhne's Market",
                        "value": "- Shop in the market with `market [optional minStat] [optional maxCost]`.\n"
                            + "(By default, you will only view items you can equip. To view everything, add `-all` to the end of your argument.\n"
                            + "- Put up items for sale to other players with `sell [weaponid] [price]`.\n"
                            + "- Buy items from the market with `buy [weaponid]`\n"
                            + "- View items you've put in the market with `pending`\n"
                            + "- Remove items you've put in the market with `unsell`\n"
                    }
                ],
                "footer": {
                    "text": "Tekhne's Market comes under the domain of the Dei of Skill. Weapons sold through the market cannot be stolen nor refunded under any circumstances."
                }
            }
        }
        functions.sendMessage(message.channel, page)
        return
    }
    let minStat = 0;
    if (!isNaN(words[1])) {
        minStat = words[1]
    }
    let maxCost = 1000000000;
    if (!isNaN(words[2])) {
        maxCost = words[2]
    }

    let weaponCount = 0
    let wepsra = []
    let all = false;
    if (words.indexOf("-all") != -1) {
        all = true
    }

    for (var weaponid in weaponData) {
        if (weaponid != undefined && weaponData[weaponid].price != undefined && weaponData[weaponid].price <= maxCost && weaponData[weaponid].attack >= minStat) {
            if (all == false) {
                if (weaponData[weaponid].type == Math.floor(userData[id].class) || weaponData[weaponid].type == 10) {
                    wepsra.push(weaponid)
                    weaponCount += 1;
                }
            } else {
                wepsra.push(weaponid)
                weaponCount += 1;
            }

        }
        if (weaponCount >= 100) {
            break
        }
    }
    wepsra.sort() //what sorts the array. Search up array.sort() on w3schools.
    let numPerPage = 5
    let pages = []
    if (wepsra.length == 0 || weaponCount == 0) {
        page = {
            "embed": {
                //"title": "Global Wealth",
                "color": 0x458B00,
                "fields": [
                    {
                        "name": "Tekhne's Market",
                        "value": "There are no weapons that fit your criteria.",
                    }
                ],
                "footer": {
                    "text": "Page 1 of 1"
                }
            }
        }
        functions.sendMessage(message.channel, page)
        return
    } else {
        let infoText = ""
        let totalText = ""
        for (var i = 0; i <= weaponCount; i += 1) {
            if (i % numPerPage != numPerPage - 1 && i != weaponCount) {
                if (wepsra[i] != undefined) {
                    infoText = display.displayWeaponText(wepsra[i])
                    infoText += "\n"
                    totalText += infoText
                }
            } else {
                if (wepsra[i] != undefined) {
                    infoText = display.displayWeaponText(wepsra[i])
                    infoText += "\n"
                    totalText += infoText
                }
                if (totalText != "") {
                    page = {
                        "embed": {
                            //"title": "Global Wealth",
                            "color": 0x458B00,
                            "fields": [
                                {
                                    "name": "Tekhne's Market",
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