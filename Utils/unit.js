var functions = require("../Utils/functions.js")
class unit {
    constructor(id) {
        this.name = userData[id].username
        this.hp = functions.calcStat(id, "hp")
        this.atk = functions.calcStat(id, "atk")
        this.spd = functions.calcStat(id, "spd")
        this.def = functions.calcStat(id, "def")
        this.res = functions.calcStat(id, "res")
        this.classInt = Math.floor((userData[id].class));
        let range = 1 + Math.floor((userData[id].class - 1) / 3);
        let subclassInt = Math.floor((userData[id].class * 10) % 10)
        let subclassMod = 0;
        if (subclassInt == 2) {
            subclassMod = -1
        } else if (subclassInt == 3 || subclassInt == 4) {
            subclassMod = 1
        }
        this.priority = range + subclassMod
    }
    getUsername() {
        return this.name
    }
    getPriority() {
        return this.priority
    }
    getRange() {
        return this.range
    }
    getHP() {
        return this.hp
    }
    getAtk() {
        return this.attack
    }
    getSpd() {
        return this.spd
    }
    getDef() {
        return this.def
    }
    getRes() {
        return this.res
    }
    getClassInt() {
        return this.classInt
    }
}

module.exports = unit