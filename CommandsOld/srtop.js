module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    let globalUsers = 0
    let globalWealth = 0;
    let xparrtosort = []
    for (var i in guildData) {
        globalWealth += guildData[i].bank;
    }
    for (var userid in userData) {//loops through user data to check. //w/o if statement, it checks everyone
        if (userData[userid].sr != undefined) {
            xparrtosort.push(userData[userid].sr + " " + userid) // push level + 100*ascensions for sorting purposes. Add the " " and the id for identification.
            globalUsers += 1;
            globalWealth += userData[userid].sr;
        }
    }
    xparrtosort.sort(function (a, b) { return parseInt(b.split(" ")[0]) - parseInt(a.split(" ")[0]) }) //what sorts the array. Search up array.sort() on w3schools.
    let numPerPage = 10
    let page = {
        "embed": { //displays guild stats
            "title": "Strongest Players",
            "color": 0xF1C40F,
            "fields": [{
                "name": "Current SR",
                "value": ""
            }],
            "footer": {
                "text": ""
            },
        }
    }
    let pages = []
    for (var i = 0; i < globalUsers; i++) {
        let user = xparrtosort[i].split(" ")
        let text = parseInt(user[0])
        let username = userData[user[1]].username
        let rank = "G"
        let sr = text
        if (sr < 99) {
            rank = "F"
        } else if (sr <= 499) {
            rank = "E"
        } else if (sr <= 999) {
            rank = "D"
        } else if (sr <= 1499) {
            rank = "C"
        } else if (sr <= 1999) {
            rank = "B"
        } else if (sr <= 2499) {
            rank = "A"
        } else if (sr <= 2999) {
            rank = "S"
        } else if (sr <= 3499) {
            rank = "X"
        } else if (sr <= 4999) {
            rank = "Y"
        } else {
            rank = "Z"
        }
        page.embed.fields[0].value += "**" + (i + 1) + ". " + username + "** with** " + text + " sr ** (" + rank + " rank)"
        if (i % numPerPage == numPerPage - 1) { // separate pages
            page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + globalUsers //add footer to display where you are
            pages.push(page)
            page = {
                "embed": { //displays guild stats
                    "title": "Strongest Players",
                    "color": 0xF1C40F,
                    "fields": [{
                        "name": "Current SR",
                        "value": ""
                    }],
                    "footer": {
                        "text": ""
                    },
                }
            }
        } else {
            page.embed.fields[0].value += "\n"
        }
    }
    if (page.embed.fields[0].value != "") {
        page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i) + " out of " + globalUsers
        pages.push(page)
        page = {
            "embed": { //displays guild stats
                "title": "Strongest Players",
                "color": 0xF1C40F,
                "fields": [{
                    "name": "Current SR",
                    "value": ""
                }],
                "footer": {
                    "text": ""
                },
            }
        }
    }
    new functions.Paginator(message.channel, message.author, pages)
}