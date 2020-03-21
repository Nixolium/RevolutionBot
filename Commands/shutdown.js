module.exports=function(message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    if (words.indexOf("-nowrite") == -1) {
        functions.writeData("Storage")
    }
    message.reply('Ascella is turning off...').then(function (session) {
        return bot.destroy()
    }).then(function (destruct) {
        setTimeout(function () {
            process.exit(2)
        }, 2000)
    }).catch(function (err) { console.error(err) })
  }