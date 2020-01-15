module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    battleData = {}
    battleData.current = 1
    functions.sendMessage(message.channel, "Battle Data Erased")
    //battleID
    //-------------
    //battleID
    //aid
    //bid
    //mapid
    //ahp
    //apos
    //bhp
    //bpos
    //turn -  true == a, false == b
}