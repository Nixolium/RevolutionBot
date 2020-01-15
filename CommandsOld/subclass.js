module.exports = function (message) {
    //functions.sendMessage(message.channel, "HP: " + userData[id].hp)
    let words = message.content.split(/\s+/)
    id = message.author.id;
    if (userData[id].status == 0) { return; }
    if (userData[id].asc < 2) {//Subclasses currently disabled
        
        functions.replyMessage(message, "Subclasses have not been unlocked.")
        return;
    }
    functions.replyMessage(message, "Subclasses are currently disabled.")
    return;
    //classList = ["Classless", "Warrior", "Archer", "Striker", "Mage", "Spellblade", "Sorcerer", "Sniper", "Oracle", "Kinetic"]
    //subclassList = ["", "Healer", "Tank", "Rider", "Dancer", "Legend"]
    if (words.length == 1) {
        let pages = []
        let pagelength = 4
        if (userData[id].asc >= 3) {
            pagelength = 5
            if (userData[id].asc >= 4) {
                pagelength = 6
            }
        }
        //let classColor = [0xffffff, 0xff0000, 0x00ff11, 0x2b6eff, 0xff9c11, 0xff3898, 0xffff00, 0xcccccc, 0xffd000, 0x000000];
        let infoText = ""
        infoText += "In addition to regular classes, you can unlock subclasses for your champion. Gain the ability to heal your allies as a Mage or Tank up a Warrior and make him much tougher than before.\n"
        infoText += "\nPlayers can change subclasses at any time, but this will set their level back to 1. Reaching level 20 with any class unlocks more classes and subclasses.\n\n"
        infoText += "Change classes with `!subclass [targetSubclass]`"
        page1 = {
            embed: {
                color: classColor[0],
                fields: [
                    {
                        name: "Subclasses Overview",
                        value: infoText,
                        inline: false
                    }
                ],
                footer: {
                    text: "Page 1 of " + pagelength
                }
            }
        }
        pages.push(page1)
        infoText = ""
        infoText += "Healers grant life to the injured. Gain the ability to \"attack\" allies to heal them in battle."
        page2 = {
            embed: {
                color: classColor[1],
                fields: [
                    {
                        name: "Healer Subclass",
                        value: infoText,
                        inline: false
                    }
                ],
                footer: {
                    text: "Page 2 of " + pagelength
                }
            }
        }
        pages.push(page2)

        infoText = ""
        infoText += "Tanks rampage, with nothing that can outmatch their pure strength. Gain additional stats at the cost of lowered movement."
        page2 = {
            embed: {
                color: classColor[2],
                fields: [
                    {
                        name: "Tank Subclass",
                        value: infoText,
                        inline: false
                    }
                ],
                footer: {
                    text: "Page 3 of " + pagelength
                }
            }
        }
        pages.push(page2)

        infoText = ""
        infoText += "Riders call upon mounts to traverse the battlefield. Gain additional movement at the cost of stats."
        page2 = {
            embed: {
                color: classColor[3],
                fields: [
                    {
                        name: "Rider Subclass",
                        value: infoText,
                        inline: false
                    }
                ],
                footer: {
                    text: "Page 4 of " + pagelength
                }
            }
        }
        pages.push(page2)

        if (userData[id].asc >= 3) {
            infoText = ""
            infoText += "Dancers call upon mystic arts to grant other units additional buffs. Gain the ability to \"attack\" an adjacent ally to give them an extra turn."
            page3 = {
                embed: {
                    color: classColor[4],
                    fields: [
                        {
                            name: "Dancer Subclass",
                            value: infoText,
                            inline: false
                        }
                    ],
                    footer: {
                        text: "Page 5 of " + pagelength
                    }
                }
            }
            pages.push(page3)
            if (userData[id].asc >= 4) {
                infoText = ""
                infoText += "Legends are powerful beings who have pleased the whims of Eris. They are awarded a small number of base stats at no cost."
                page7 = {
                    embed: {
                        color: classColor[5],
                        fields: [
                            {
                                name: "Legend Subclass",
                                value: infoText,
                                inline: false
                            }
                        ],
                        footer: {
                            text: "Page 6 of " + pagelength
                        }
                    }
                }
                pages.push(page7)
            }
        }
        new functions.Paginator(message.channel, message.author, pages)
    } else {
        if (display.checkCooldown(message, "Subclass Change") == false) {
            return;
        }
        classTarget = words[1].toUpperCase()
        //classList = ["Classless", "Warrior", "Archer", "Striker", "Mage", "Spellblade", "Sorcerer", "Sniper", "Oracle", "Kinetic"]
        //subclassList = ["", "Healer", "Tank", "Rider", "Dancer", "Legend"]
        let returnText = ""
        if (classTarget == `HEALER`) {
            userData[id].class = Math.floor(userData[id].class) + 0.1
            returnText += "You are now a " + classList[Math.floor(userData[id].class)] + " " + subclassList[Math.floor((userData[id].class * 10) % 10)] + "!"
        } else if (classTarget == `TANK`) {
            userData[id].class = Math.floor(userData[id].class) + 0.2
            returnText += "You are now a " + classList[Math.floor(userData[id].class)] + " " + subclassList[Math.floor((userData[id].class * 10) % 10)] + "!"
        } else if (classTarget == `RIDER`) {
            userData[id].class = Math.floor(userData[id].class) + 0.3
            returnText += "You are now a " + classList[Math.floor(userData[id].class)] + " " + subclassList[Math.floor((userData[id].class * 10) % 10)] + "!"
        } else if (classTarget == `DANCER` && userData[id].asc >= 3) {
            userData[id].class = Math.floor(userData[id].class) + 0.4
            returnText += "You are now a " + classList[Math.floor(userData[id].class)] + " " + subclassList[Math.floor((userData[id].class * 10) % 10)] + "!"
        } else if (classTarget == `LEGEND` && userData[id].asc >= 4) {
            userData[id].class = Math.floor(userData[id].class) + 0.5
            returnText += "You are now a " + classList[Math.floor(userData[id].class)] + " " + subclassList[Math.floor((userData[id].class * 10) % 10)] + "!"
        } else {
            functions.replyMessage(message, "That is not an available subclass. Use `subclass` to see your available classes")
            return;
        }

        userData[id].level = 1
        userData[id].hp = 10
        userData[id].atk = 5
        userData[id].spd = 5
        userData[id].def = 5
        userData[id].res = 5

        //subclassList = ["", "Healer", "Tank", "Rider", "Dancer", "Legend"]
        let classInt = Math.floor(userData[id].class)
        let starter = 0;
        if (classInt == 1 || classInt == 2) {
            starter = 47
        } else if (classInt == 3) {
            starter = 46
        } else if (classInt == 4 || classInt == 5) {
            starter = 44
        } else if (classInt == 6) {
            starter = 43
        } else if (classInt == 7 || classInt == 8) {
            starter = 41
        } else if (classInt == 9) {
            starter = 40
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
        starter += subclassMod
        starter -= 30;


        for (starter; starter > 0; starter--) {
            roll = Math.random()
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
        }

        returnText += " (" + userData[id].hp + "/" + userData[id].atk + "/" + userData[id].spd + "/" + userData[id].def + "/" + userData[id].res + ")"

        display.setCooldown(message, "Subclass Change", 3600)

        functions.replyMessage(message, returnText)
    }
}