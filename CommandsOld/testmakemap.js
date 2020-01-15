module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    //
    let mapid = 0
    let aid = id
    let bid = "522616720515530755"

    ahp = userData[aid].hp
    apos = 60//down then right, 0 to 6.

    bhp = userData[bid].hp
    bpos = 06

    turn = Math.random() >= .5
    console.log(turn)

    //let text = 
    functions.sendMessage(message.channel, {
        "embed": {
            "description": display.printmap(aid, bid, mapid, ahp, apos, bhp, bpos, turn),
        }
    })
}