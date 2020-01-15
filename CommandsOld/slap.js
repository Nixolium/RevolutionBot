module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    let target = functions.validate(message)
    if (target == false) { return }
    functions.dmUser(target, "<@" + target + "> has been slapped by <@" + id + ">! \nhttps://media.giphy.com/media/xT9IgzTnZHL9zp6IPS/giphy.gif")
    functions.sendMessage(message.channel, "<@" + target + "> has been slapped by <@" + id + ">! \nhttps://media.giphy.com/media/xT9IgzTnZHL9zp6IPS/giphy.gif")
}