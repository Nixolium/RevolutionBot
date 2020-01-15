var functions = require("../Utils/functions.js")
class weapon {
    constructor(ownerid, name, attack, type, description, skill) {
        let classInt = Math.floor(userData[ownerid].class)
        this.ownerid = ownerid
        if (name == -1) {
            name = ""
            let nameList = ["Happy"]
            if (attack < 11) {
                nameList = ["Common", "Iron", "Bronze", "Copper", "Basic", "Silver"]
            } else if (attack < 13) {
                nameList = ["Rare", "Glass", "Golden", "Obsidian", "Exquisite", "Powerful", "Diamond"]
            } else if (attack < 15) {
                nameList = ["Epic", "Mythril", "Flameblitz", "Wavetide", "Stormstrike", "Galedance", "Quakeform"]
            } else {
                nameList = ["Legendary", "Eris's", "Aneris's", "Tekhne's", "Enyo's", "Nyx's", "Arke's"]
            }
            name = nameList[Math.floor(Math.random() * nameList.length)]
            name += " "
            if (classInt == 1) {
                name += "Sword"
            } else if (classInt == 2) {
                name += "Gauntlet"
            } else if (classInt == 3) {
                name += "Spear"
            } else if (classInt == 4) {
                name += "Bow"
            } else if (classInt == 5) {
                name += "Tome"
            } else if (classInt == 6) {
                name += "Staff"
            } else if (classInt == 7) {
                name += "Rifle"
            } else if (classInt == 8) {
                name += "Orb"
            } else if (classInt == 9) {
                name += "Aura"
            } else {
                name += "Stick"
            }
        }
        this.name = name

        this.attack = attack
        if (type == -1) {
            type = classInt;
        }
        if (type == -2) {
            type = 10;
        }
        this.type = type
        let id = -1
        for (let i = 1000; i < 9999999; i++) {
            if (weaponData[i] == undefined) {
                id = i
                break;
            }
        }
        this.id = id
        if (description != -1) {
            this.description = description
        } else {
            this.description = ""
        }
        if (skill != -1) {
            this.skill = skill
            this.ability = skillData[skill].description
        } else {
            this.skill = {}
            this.ability = ""
        }
    }
    smelt() {
        temp = userData[this.ownerid].inventory
        temp = arrayRemove(temp, this.id)
        delete this
        return;
    }
    getid() {
        return this.id
    }
}
module.exports = weapon

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });

}