module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (devs.indexOf(id) == -1) { return }
    //functions.logCommand(message)
  if (words.indexOf("-nowrite") == -1) {
      //functions.replyMessage(message,"Writing data to file...")
      functions.writeData("Storage")
  }
  if (words.indexOf("-nobackup") == -1) {
      this.backup(message)
  }
  message.reply('Eris is shutting down...').then(function (session) {
      return bot.destroy()
  }).then(function (destruct) {
      setTimeout(function () {
          process.exit(2)
      }, 2000)
  }).catch(function (err) { console.error(err) })
}