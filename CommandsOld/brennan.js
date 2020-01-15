module.exports = function (message) {
    let words = message.content.split(/\s+/)
    id = message.author.id;
    let target = id;
    let messages = ["I JUST DONT UNDERSTAND!", "For those of you staring into never-ever land...", "Where is my BRISSKKKK!", "ITS BEEN ON THE CALENDAR SINCE DAY ONE!", "STOP IT!", "I AM NOT DOING THIS FOR MY OWN HEEALTH REASONS! START TAKING NOTES", "WHY DIDNT U DO THE NOTES", "MY DAUGHTER IS IN A SPECIAL PLACE NOW", "The north is in the south and th south is in the north", "ShOcKiNg!", "FOR WHAT CRIME!??!", "My uncle is angry because he now lives in the seventh golf house instead of the eigth golf house", "A quick side story... (Twenty hours later)", "Oh yeah, by the way, they make fun of the french", "AGAIN THE FRENCH SURIVIVED 6 WEEKS, SURPRISING!", "OOPS!"]

    functions.sendMessage(message.channel, {
        "embed": {
            "color": 15581186,  
            "thumbnail": {
                "url": "https://i.imgur.com/nUGkRPo.jpg"//https://i.imgur.com/xnRZhIW.jpg" Elongated image
            },
            "fields": [
                {
                    "name": "Brennan Speaks",
                    "value": "**" + messages[Math.floor(Math.random()*messages.length)] + "**"
                }
            ]
        }
    });
    delete (message);
}