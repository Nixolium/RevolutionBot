var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  functions.sendMessage(message.channel, {
    "embed": {
      "description": "Invite the bot to your server by clicking [here!](https://discordapp.com/oauth2/authorize?client_id=579335308638945304&permissions=8&scope=bot) ",
      "color": 5251510,
      "timestamp": "2019-07-8T21:42:00.210Z",
      "footer": {
        "icon_url": "https://i.imgur.com/NI4HDRs.jpg",
        "text": "Made by Nix#6340"
      },
      "image": {
        "url": "https://i.imgur.com/3X6c1sU.jpg"
      },
      "author": {
        "name": "Eris - An Discord RPG Bot",
      }
    }
  });
}