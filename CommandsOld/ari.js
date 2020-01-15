module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    let target = id;
    if (words.length == 1) {
        //target = message.author.id;
    } else {
        target = functions.validate(message)
        if (target == false) {
            return;
        }
    }
    let attack = 3
        /*if (classInt == 1 || classInt == 2 || classInt == 3) {
            attack = attack
        } else if (classInt == 4 || classInt == 5 || classInt == 6) {
            attack -= 2
        } else {
            attack -= 4
        }
        let adv = 4
        let roll = Math.random() + 1
        if (adv * roll > 4) {
            attack += 2
        }
        if (adv * roll > 9) {
            attack += 2
        }
        if (adv * roll > 14) {
            attack += 2
        }*/
    functions.sendMessage(message.channel, display.displayWeaponText(display.generateWeapon(target, -1, attack, -2, "Pulled from the abyss", -1)))
}