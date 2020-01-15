module.exports = function (message) {
    let id = message.author.id; //initiates blank map.
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    mapData[0] = {};
    mapData[0].name = "Slate"
    mapData[0].spaces = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
    mapData[0].author = "Nix"

    mapData[1] = {};
    mapData[1].name = "Forest"
    mapData[1].spaces = [[0, 1, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 1, 0], [0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0]]
    mapData[1].author = "Nix"

    mapData[2] = {};
    mapData[2].name = "Theatre"
    mapData[2].spaces = [[0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 0], [0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0], [0, 1, 1, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0]]
    mapData[2].author = "Nix"

    mapData[3] = {};
    mapData[3].name = "Maze"
    mapData[3].spaces = [[0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0]]
    mapData[3].author = "Nix"

    functions.sendMessage(message.channel, "Maps Reset")
}