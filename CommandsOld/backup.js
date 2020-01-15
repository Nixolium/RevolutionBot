module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    //functions.replyMessage(message, "Backing up data...")
    //fs.mkdirSync('AutoBackup/' + ts)
    //functions.writeData('AutoBackup/' + ts)
    functions.replyMessage(message, "Writing data to file...")
    functions.writeData("Storage")
    functions.replyMessage(message, "Data backed up!")
    //functions.logCommand(message)
}