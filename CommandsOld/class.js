module.exports = function (message) {
    //functions.sendMessage(message.channel, "HP: " + userData[id].hp)
    let words = message.content.split(/\s+/)
    let id = message.author.id;
    if (userData[id].status == 0) { return; }
    //global.classList = ["Classless", "Warrior", "Striker", "Spellblade", "Archer", "Mage", "Sorcerer", "Sniper", "Oracle", "Kinetic"]
    //global.classColor = [0xffffff, 0xff0000, 0x2b6eff, 0xff3898, 0x00ff11, 0xff9c11, 0xffff00, 0xcccccc, 0xffd000, 0x000000];
    if (words.length == 1) {
        let pages = []
        let classColor = [0xffffff, 0xff0000, 0x00ff11, 0x2b6eff, 0xff9c11, 0xff3898, 0xffff00, 0xcccccc, 0xffd000, 0x000000];
        let infoText = ""
        infoText += "No RPG is complete without being able to choosing a class to fit your playstyle. Become the fierce warrior fighting through enemy lines or the explosive mage blasting fire from afar. Whatever you choose, through strength and wit, the taste of victory lingers for heroes to claim.\n"
        infoText += "\nPlayers can change class (and subclass) at any time, but this will set their level back to 1. Reaching level 20 with any class unlocks more classes and subclasses.\n\n"
        infoText += "Change classes with `class [targetClass]`"
        let pagelength = 5
        if (userData[id].asc >= 2) {
            pagelength = 7
            if (userData[id].asc >= 3) {
                pagelength = 9
                if (userData[id].asc >= 4) {
                    pagelength = 10
                }
            }
        }
        page1 = {
            embed: {
                color: classColor[0],
                fields: [
                    {
                        name: "Classes Overview",
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
        infoText += "Damage Type: Physical\n"
        infoText += "Attack Range: 1\n"
        infoText += "Stat Potential: High\n"
        page2 = {
            embed: {
                color: classColor[1],
                fields: [
                    {
                        name: "Warrior Class",
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
        infoText += "Damage Type: Physical\n"
        infoText += "Attack Range: 2\n"
        infoText += "Stat Potential: Medium"
        page3 = {
            embed: {
                color: classColor[2],
                fields: [
                    {
                        name: "Archer Class",
                        value: infoText,
                        inline: false
                    }
                ],
                footer: {
                    text: "Page 3 of " + pagelength
                }
            }
        }
        pages.push(page3)
        infoText = ""
        infoText += "Damage Type: Magical\n"
        infoText += "Attack Range: 1\n"
        infoText += "Stat Potential: High"
        page4 = {
            embed: {
                color: classColor[3],
                fields: [
                    {
                        name: "Striker Class",
                        value: infoText,
                        inline: false
                    }
                ],
                footer: {
                    text: "Page 4 of " + pagelength
                }
            }
        }
        pages.push(page4)
        infoText = ""
        infoText += "Damage Type: Magical\n"
        infoText += "Attack Range: 2\n"
        infoText += "Stat Potential: Medium"
        page5 = {
            embed: {
                color: classColor[4],
                fields: [
                    {
                        name: "Mage Class",
                        value: infoText,
                        inline: false
                    }
                ],
                footer: {
                    text: "Page 5 of " + pagelength
                }
            }
        }
        pages.push(page5)
        if (userData[id].asc >= 2) {
            infoText = ""
            infoText += "Damage Type: Dual\n"
            infoText += "Attack Range: 1\n"
            infoText += "Stat Potential: Medium-High\n"
            infoText += "*Spellblades deal damage calculated by the lower of your enemy's defense or resistance.*"
            page6 = {
                embed: {
                    color: classColor[5],
                    fields: [
                        {
                            name: "Spellblade Class",
                            value: infoText,
                            inline: false
                        }
                    ],
                    footer: {
                        text: "Page 6 of " + pagelength
                    }
                }
            }
            pages.push(page6)

            infoText = ""
            infoText += "Damage Type: Dual\n"
            infoText += "Attack Range: 2\n"
            infoText += "Stat Potential: Low-Medium\n"
            infoText += "*Sorcerers deal damage calculated by the lower of your enemy's defense or resistance.*"
            page7 = {
                embed: {
                    color: classColor[6],
                    fields: [
                        {
                            name: "Sorcerer Class",
                            value: infoText,
                            inline: false
                        }
                    ],
                    footer: {
                        text: "Page 7 of " + pagelength
                    }
                }
            }
            pages.push(page7)
            if (userData[id].asc >= 3) {
                infoText = ""
                infoText += "Damage Type: Physical\n"
                infoText += "Attack Range: 3\n"
                infoText += "Stat Potential: Low\n"
                infoText += "*Snipers deal physical damage from extremelly far distances at the cost of significantly lowered stats.*"
                page8 = {
                    embed: {
                        color: classColor[7],
                        fields: [
                            {
                                name: "Sniper Class",
                                value: infoText,
                                inline: false
                            }
                        ],
                        footer: {
                            text: "Page 8 of " + pagelength
                        }
                    }
                }
                pages.push(page8)

                infoText = ""
                infoText += "Damage Type: Magical\n"
                infoText += "Attack Range: 3\n"
                infoText += "Stat Potential: Low\n"
                infoText += "*Oracles deal magical damage from extremelly far distances at the cost of significantly lowered stats.*"
                page9 = {
                    embed: {
                        color: classColor[8],
                        fields: [
                            {
                                name: "Oracle Class",
                                value: infoText,
                                inline: false
                            }
                        ],
                        footer: {
                            text: "Page 9 of " + pagelength
                        }
                    }
                }
                pages.push(page9)

                if (userData[id].asc >= 3) {
                    infoText = ""
                    infoText += "Damage Type: Dual\n"
                    infoText += "Attack Range: 3\n"
                    infoText += "Stat Potential: Very Low\n"
                    infoText += "*Kinetics deal dual damage from extremelly far distances at the cost of significantly lowered stats.*"
                    page10 = {
                        embed: {
                            color: classColor[9],
                            fields: [
                                {
                                    name: "Kinetic Class",
                                    value: infoText,
                                    inline: false
                                }
                            ],
                            footer: {
                                text: "Page 10 of " + (1 + pagelength)
                            }
                        }
                    }
                    pages.push(page10)
                }
            }
        }
        new functions.Paginator(message.channel, message.author, pages)
    } else {
        if (display.checkCooldown(message, "Class Change") == false) {
            return;
        }
        classTarget = words[1].toUpperCase()
        //classList = ["Classless", "Warrior", "Archer", "Striker", "Mage", "Spellblade", "Sorcerer", "Sniper", "Oracle", "Kinetic"]
        let returnText = ""
        if (classTarget == `WARRIOR`) {
            userData[id].class = 1
            returnText += "You are now a Warrior!"
        } else if (classTarget == `ARCHER`) {
            userData[id].class = 4
            returnText += "You are now a Archer!"
        } else if (classTarget == `STRIKER`) {
            userData[id].class = 2
            returnText += "You are now a Striker!"
        } else if (classTarget == `MAGE`) {
            userData[id].class = 5
            returnText += "You are now a Mage!"
        } else if (classTarget == `SPELLBLADE` && userData[id].asc >= 2) {
            userData[id].class = 3
            returnText += "You are now a Spellblade!"
        } else if (classTarget == `SORCERER` && userData[id].asc >= 2) {
            userData[id].class = 6
            returnText += "You are now a Sorcerer!"
        } else if (classTarget == `SNIPER` && userData[id].asc >= 3) {
            userData[id].class = 7
            returnText += "You are now a Sniper!"
        } else if (classTarget == `ORACLE` && userData[id].asc >= 3) {
            userData[id].class = 8
            returnText += "You are now a Oracle!"
        } else if (classTarget == `KINETIC` && userData[id].asc >= 4) {
            userData[id].class = 9
            returnText += "You are now a Kinetic!"
        } else {
            functions.replyMessage(message, "That is not an available class. Use `class` to see your available classes")
            return;
        }
        /*if (userData[id].asc >= 2) {
            returnText += " Subclasses are now also available at this time (If you so choose)."
        }*/


        userData[id].level = 1
        userData[id].hp = 10
        userData[id].atk = 5
        userData[id].spd = 5
        userData[id].def = 5
        userData[id].res = 5

        let classInt = Math.floor(userData[id].class)
        let starter = display.calculateStarter(id)
        starter -= 30;
        for (starter; starter > 0; starter--) {
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

        returnText += " (" + userData[id].hp + "/" + userData[id].atk + "/" + userData[id].spd + "/" + userData[id].def + "/" + userData[id].res + ")"

        userData[id].weapon = -1

        display.setCooldown(message, "Class Change", 3600)

        functions.replyMessage(message, returnText)
    }
}