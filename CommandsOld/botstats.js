var functions=require("../Utils/functions.js")
module.exports=function(message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    functions.sendMessage(message.channel, {
      embed: { //displays guild stats
        title: "Bot Stats",
        color: 0xF1C40F,
        fields: [{ //displays variables
          name: "Total Accounts",
          value: Object.keys(userData).length,
          inline: true
        }, { //displays variables
          name: "Total Guilds",
          value: Object.keys(guildData).length,
          inline: true
        }, {
          name: "Total Servers",
          value: bot.guilds.size,
          inline: true
        }]
      }
    });
}