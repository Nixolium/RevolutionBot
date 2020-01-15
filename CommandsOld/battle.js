module.exports = function (message) {
    let words = message.content.split(/\s+/)
    id = message.author.id;
    if (userData[id].status == 0) { return; }
    let target = -1;
    let idavy = message.author.avatarURL
    let channel = message.channel
    let money = 0
    if (words.length > 1) {
        if (words[1].toUpperCase() == "HELP") {
            functions.sendMessage(message.channel, "Help text coming soon. Use syntax: `!battle [target] [taunt]`")
            return;
        } else {
            target = functions.validate(message)
            if (target == false) {
                return;
            }
        }
    }
    let embedtext = "<@" + id + "> has created an open challenge!"
    //embedtext += money
    embedtext += "\nReact to accept their challenge."
    let text = {
        embed: {
            color: 0xfaa920,
            thumbnail: {
                url: idavy
            },
            fields: [
                {
                    name: "⚔ Open Duel Challenge ⚔",
                    value: embedtext,
                    inline: false
                }
            ],
            footer: {
                text: "All duels are judged fairly in the name of Enyo, Dei of War."
            }
        }
    }
    if (channel.guild != undefined && serverData[channel.guild.id] != undefined && serverData[channel.guild.id].disabledChannels.indexOf(channel.id) != -1) { return; }
    if (channel.type != "dm" && channel.type != "group" && (channel.memberPermissions(bot.user) != null && !channel.memberPermissions(bot.user).has("SEND_MESSAGES"))) { return }
    channel.send(text).then(function (message) {
        message.react('⚔')//.then(() => message.react('🛑'));
        const filter = (reaction, user) => {
            target = user.id
            targetavy = user.avatarURL
            return ['⚔'].includes(reaction.emoji.name) && user.id != id && user.id != 579335308638945304 && userData[id] != null && userData[id].status != 0 && (target == -1 || user.id == target)
        };
        message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '⚔') {
                    battleid = display.makebattle(id, target, Math.floor(Object.keys(mapData).length * Math.random()))//battle initiated!
                    //console.log(battleid)
                    new functions.SoloBattle(message.channel, id, target, battleid)
                }
                else {
                    functions.sendMessage(message.channel, "Battle Canceled.")
                    return
                }
            })
            .catch(collected => {
                //functions.sendMessage(message.channel, "No response")
                //console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                functions.sendMessage(message.channel, "<@" + id + ">'s battle challenge has timed out.");
            });
    }).catch(function (err) {
        console.error(err)
    })

    //if (devs.indexOf(id) == -1) { return }
}