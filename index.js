const Discord = require('discord.js');
const asyncpkg = require("async")
global.ready = false
global.bot = new Discord.Client();
global.botOnline = true
global.fs = require('fs')
global.functions = require(`./Utils/functions.js`)
global.display = require(`./Utils/display.js`)

var commands = {}
var commandlist = {}
fs.readdir("./Commands/", (err, files) => {
    if (err) return console.error(err);
    console.log("Ran")
    files.forEach(file => {
        //console.log(file)
        // If the file is not a JS file, ignore it (thanks, Apple)
        if (!file.endsWith(".js")) { return };
        // Load the event file itself
        let commandname = file.split(".")[0];
        //console.log(commandname)
        commands[commandname] = require(`./Commands/${file}`);
        commandlist[commandname] = "exists"
        // Get just the event name from the file name
        delete require.cache[require.resolve(`./Commands/${file}`)];

    });
    //console.log(commandlist)
});


let config = require('./config.json')
global.talkedRecently = new Set();
const TOKEN = config.token;

global.devData = JSON.parse(fs.readFileSync('Storage/devData.json', 'utf8'));

global.admins = devData.admins
global.devs = devData.devs
global.debugGuildId = devData.debugGuildId
global.debugChannelId = devData.debugChannelId
global.defaultPrefix = devData.defaultPrefix

global.moment = require('moment'); //moment package, lets you view date and time nicely




global.devData = JSON.parse(fs.readFileSync('Storage/devData.json', 'utf8'));
global.serverData = JSON.parse(fs.readFileSync('Storage/serverData.json', 'utf8'));
global.gameData = JSON.parse(fs.readFileSync('Storage/gameData.json', 'utf8'));
//global.skillData = JSON.parse(fs.readFileSync('Storage/skillData.json', 'utf8'));
global.userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
//global.weaponData = JSON.parse(fs.readFileSync('Storage/weaponData.json', 'utf8'));

//global.battleData = JSON.parse(fs.readFileSync('Storage/battleData.json', 'utf8')); //Stores all ongoing battles
//global.mapData = JSON.parse(fs.readFileSync('Storage/mapData.json', 'utf8')); //Stores the possible maps of the battles

// I ain't got a clue how this works
/*if (devData.dblenable) {
    const http = require('http');
    const DBL = require('dblapi.js');
    const server = http.createServer(function (req, res) {
        res.write("Recieved a post request");
        res.end();
    });
    const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjYyMjAyMjcwOTYwODQ2OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ5ODE3MTkxfQ.2pFz9ECHEzpi0OtneZ2LrP-_apXf5oXj2Tsv_OaUPTw', { webhookAuth: 'GLORYpassword', webhookServer: server }, bot);
}*/

function addServer(guild) {
    if (serverData[guild.id] == undefined) { serverData[guild.id] = {} }

    serverData[guild.id].prefix = defaultPrefix
    serverData[guild.id].disabledChannels = []
}

//console.log("Hello")
function evaluateMessage(message) {

    if (ready == false) { return }
    if (bot.user.id === message.author.id) { return }
    if (!devData.enable && devs.indexOf(message.author.id) == -1) {
        return;
    }
    //console.time("actual ping")
    //sendMessage(message.channel, "actual ping")
    
    /*if (banlist.indexOf(message.author.id) != -1){
		return;
	}*/
    if (message.channel.type != "dm" && serverData[message.guild.id] == undefined) {
        addServer(message.guild)
    }
    message.content = message.content.trim().split(/\s+/).join(" ")
    let prefix = (message.channel.type == "dm") ? defaultPrefix : serverData[message.guild.id].prefix;
    if (message.content.startsWith("<@579335308638945304>")) prefix = "<@579335308638945304>"
    if (message.content.startsWith("<@!579335308638945304>")) prefix = "<@!579335308638945304>"
    if (message.content.startsWith("<@579335308638945304> ")) {
        let words = message.content.trim().split(/\s+/)
        words.splice(0, 1)
        message.content = prefix + words.join(" ")
    }
    if (message.content.startsWith("<@!579335308638945304> ")) {
        let words = message.content.trim().split(/\s+/)
        words.splice(0, 1)
        message.content = prefix + words.join(" ")
    }
    if (message.author.bot == true) {

        return
    }
    if ((message.content.startsWith(prefix + "setcommandtimer") || message.content.startsWith(prefix + "sct")) && devs.indexOf(message.author.id) != -1) {
        let words = message.content.trim().split(/\s+/)
        let time = 0
        let ts = message.createdTimestamp;
        let regexp = /\b([0-9]+h)?([0-9]+m)?([0-9]+s)?\b/
        if (words[1] != undefined && regexp.test(words[1])) {
            let saveindex = 0
            const timevalues = { "h": 3600000, "m": 60000, "s": 1000 }
            for (var i = 0; i < words[1].length; i++) {
                if (timevalues[words[1].slice(i, i + 1)] != undefined) {
                    if (isNaN(parseInt(words[1].slice(saveindex, i)))) { return functions.replyMessage(message, "Something happened. The regex broke.") }
                    time += parseInt(words[1].slice(saveindex, i)) * timevalues[words[1].slice(i, i + 1)]
                    saveindex = i + 1
                }
            }
        } else {
            return functions.replyMessage(message, "Please specify a valid time. Ex. 1h2m3s")
        }
        words.splice(0, 2)
        message.content = prefix + words.join(" ")
        message.createdTimestamp += time
        functions.replyMessage(message, "The command `" + prefix + words.join(" ") + "`" + " will be executed in " + functions.displayTime(ts + time, ts))
        bot.setTimeout(function () {
            evaluateMessage(message)
        }, time)
        return
    }
    let id = message.author.id;
    if (message.content.startsWith(prefix + "runas") && devs.indexOf(message.author.id) != -1) {
        let words = message.content.trim().split(/\s+/)
        if (words.length < 3) {
            return functions.replyMessage(message, "Please specify a user and a command.")
        }
        words.splice(0, 1)
        if (words[0].startsWith("<@") && words[0].endsWith(">")) {
            words[0] = words[0].slice(2, -1)
        }
        if (words[0].startsWith("!")) {
            words[0] = words[0].slice(1)
        }
        if (userData[words[0]] == undefined || !bot.users.has(words[0])) {
            return functions.replyMessage(message, "That is an invalid user.")
        }
        message.author = bot.users.get(words[0])

        words.splice(0, 1)
        message.content = words.join(" ")
    }
    message.author.original = id
    functions.respond(message)
    if (!message.content.startsWith(prefix)) {
        return;
    }
    id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //here
    let command = words[0].toLowerCase()
    if (command.length <= prefix.length) { return }
    command = command.slice(prefix.length)
    //-----------------------------

    functions.checkStuff(message)

    if (command == 'reload' && devs.indexOf(message.author.id) != -1) {
        //if (words.length <= 1) return functions.replyMessage(message, "Must provide a command name to reload.");
        let commandName = words[1];
        // Check if the command exists and is valid
        if (commandName == "all" || 1 == 1) { commandName = "Utils" }
        if (commandName == "Utils") {
            fs.readdir("./Utils/", (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    //console.log(file)
                    // If the file is not a JS file, ignore it (thanks, Apple)
                    if (!file.endsWith(".js")) { return };
                    // Load the event file itself
                    let commandname = file.split(".")[0];
                    //console.log(commandname)
                    delete require.cache[require.resolve(`./Utils/${file}`)];
                    // Get just the event name from the file name
                });
            })
            functions.replyMessage(message, "You have successfully reloaded all Utils!")
            commandName = "functions"
        }
        if (commandName == "functions") {
            delete require.cache[require.resolve(`./Utils/functions.js`)];

            functions.replyMessage(message, "You have successfully reloaded all functions.")
            commandName = "displays"
        }
        if (commandName == "displays") {
            delete require.cache[require.resolve(`./Utils/display.js`)];
            //delete require.cache[require.resolve(`./index.js`)]
            commandName = "Commands"
            functions.replyMessage(message, "You have successfully reloaded all displays.")
        }
        if (commandName == "Commands") {
            fs.readdir("./Commands/", (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    //console.log(file)
                    // If the file is not a JS file, ignore it (thanks, Apple)
                    if (!file.endsWith(".js")) { return };
                    // Load the event file itself
                    let commandname = file.split(".")[0];
                    //console.log(commandname)
                    delete require.cache[require.resolve(`./Commands/${file}`)];
                    commands[commandname] = require(`./Commands/${file}`);
                    commandlist[commandname] = "exists"
                    // Get just the event name from the file name
                    delete require.cache[require.resolve(`./Commands/${file}`)];

                });
                //console.log(commandlist)

            });
            functions.replyMessage(message, "All commands have been reloaded!")
        } else {
            if (!commandName.endsWith(".js")) { return functions.replyMessage(message, "The file needs to end with .js (e.g. attack.js)") }
            if (commands[commandName.split(".")[0]] == undefined) {
                return functions.replyMessage(message, "That command does not exist");
            }
            // the path is relative to the *current folder*, so just ./filename.js
            delete require.cache[require.resolve(`./Commands/${commandName}`)];
            delete commands[commandName.split(".")[0]];
            commands[commandName.split(".")[0]] = require(`./Commands/${commandName}`);
            functions.replyMessage(message, `The command ${commandName} has been reloaded!`);
        }
    }
    //do command stuff here

    if (commandlist[command] == undefined) { return }

    console.log(message.author.id + "|" + message.content + "|" + ts)
    commands[command](message)
    functions.checkStuff(message)

    //XP stuff here
    /*if (userData[message.author.id] != undefined && userData[message.author.id].status != 0) {
        functions.addxp(message, 1);
    }*/
}

bot.on("message", message => {
    evaluateMessage(message)
});


bot.on('ready', function () {
    console.log("Ascella Activated!");
    ready = true
    bot.user.setActivity('with the lives of mortals', { type: 'PLAYING' });
})
bot.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    addServer(guild)

    var allowedchannels = guild.channels.filter(channel => channel.type == "text" && channel.memberPermissions(bot.user).has("SEND_MESSAGES"))
    if (allowedchannels.size == 0) { return }
    var channel = allowedchannels.find(channel => channel.name == "botspam" || channel.name == "general")
    if (channel == undefined) { channel = allowedchannels.first() }
})
bot.on("disconnect", event => {
    console.log("Bot disconnected");
})
bot.on("error", error => {
    console.log(error.message + "\nFile name:" + error.fileName + "\nLine number:" + error.lineNumber);
})
bot.on("debug", debug => {

})
bot.login(TOKEN);
