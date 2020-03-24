module.exports = function (message) {
    let words = message.content.split(/\s+/)
    let ts = message.createdTimestamp
    let prefix = functions.getprefix(message)
    let id = message.author.id
    
    target = "You"
    if (words.length > 1) {
        target = words[1]
    }

    insultra = [
        "They have a plentiful lack of wit. (Hamlet, Act 2, Scene 2) ",
        "It is a tale told by an idiot, full of sound and fury, signifying nothing. (Macbeth, Act 5, Scene 5) ",
        "His wit’s as thick as a Tewkesbury mustard. (Henry IV, Part 2, Act 2, Scene 4) ",
        "Your abilities are too infant-like for doing much alone. (Coriolanus, Act 2, Scene 1) ",
        "If thou wilt needs marry, marry a fool; for wise men know well enough what monsters you make of them. (Shakespeare insult 10: Hamlet, Act 3, Scene 1) ",
        "More of your conversation would infect my brain. (Coriolanus, Act 2, Scene 1) ",
        "Thou sodden-witted lord! Thou hast no more brain than I have in mine elbows! (Troilus and Cressida, Act 2, Scene 1) ",
        "Your brain is as dry as the remainder biscuit after voyage. (As You Like It, Act 2, Scene 7) ",
        "If you spend word for word with me, I shall make your wit bankrupt. (Two Gentlemen of Verona, Act 2, Scene 4) ",
        "He has not so much brain as ear-wax. (Troilus and Cressida Act 5, Scene 1) ",
        "Thou art the cap of all the fools. (Timon of Athens, Act 4, Scene 3) ",
        "There’s small choice in rotten apples. (Taming of the Shrew, Act 1, Scene 1) ",
        "Away thou rag, thou quantity, thou remnant. (The Taming of the Shrew, Act 4, Scene 3) ",
        "Foul spoken coward, that thund’rest with thy tongue, and with thy weapon nothing dares perform. (Titus Andronicus, Act 2, Scene 1) ",
        "Go, prick thy face, and over-red thy fear, Thou lily-liver’d boy. (Macbeth, Act 5, Scene 3) ",
        "You, minion, are too saucy. (The Two Gentlemen of Verona, Act 1, Scene 2) ",
        "I must tell you friendly in your ear, sell when you can, you are not for all markets. (As You Like It, Act 3, Scene 5) ",
        "I scorn you, scurvy companion. (Henry IV, Part 2, Act 2, Scene 4) ",
        "Was the Duke a flesh-monger, a fool and a coward? (Measure For Measure, Act 5, Scene 1) ",
        "You are not worth another word, else I’d call you knave. (All’s Well That Ends Well, Act 2, Scene 3) ",
        "Thou whoreson zed, thou unnecessary letter! (King Lear, Act 2, Scene 2) ",
        "Thy sin’s not accidental, but a trade. (Measure For Measure, Act 3, Scene 1) ",
        "A fool, an empty purse. There was no money in’t. (Cymbeline, Act 4, Scene 2) ",
        "Thy tongue outvenoms all the worms of Nile. (Cymbeline, Act 3, Scene 4) ",
        "Away, you mouldy rogue, away! (Henry IV, Part 2, Act 2, Scene 4) ",
        "Would thou wert clean enough to spit upon. (Timon of Athens, Act 4, Scene 3) ",
        "I do desire that we may be better strangers. (As You Like It, Act 3, Scene 2) ",
        "You are as a candle, the better burnt out. (Henry IV Part 2, Act 1, Scene 2) ",
        "Drunkenness is his best virtue, for he will be swine drunk, and in his sleep he does little harm, save to his bedclothes about him. (All’s Well That Ends Well, Act 4, Scene 3) ",
        "You are now sailed into the north of my lady’s opinion, where you will hang like an icicle on a Dutchman’s beard. (Twelfth Night, Act 3, Scene 2) ",
        "Threadbare juggler! (The Comedy of Errors, Act 5, Scene 1) ",
        "Eater of broken meats! (King Lear, Act 2, Scene 2) ",
        "Saucy lackey! (As You Like It, Act 3, Scene 2) ",
        "Heaven truly knows that thou art false as hell. (Othello, Act 4, Scene 2) ",
        "Thou subtle, perjur’d, false, disloyal man! (The Two Gentlemen of Verona, Act 4, Scene 2) ",
        "Thine forward voice, now, is to speak well of thine friend; thine backward voice is to utter foul speeches and to detract. (The Tempest, Act 2, Scene 2) ",
        "Dissembling harlot, thou art false in all. (The Comedy of Errors, Act 4, Scene 4) ",
        "There’s no more faith in thee than in a stewed prune. (Henry IV Part 1, Act 3, Scene 3) ",
        "A most notable coward, an infinite and endless liar, an hourly promise breaker, the owner of no one good quality. (All’s Well That Ends Well, Act 3, Scene 6) ",
        "I do wish thou were a dog, that I might love thee something. (Timon of Athens, Act 4, Scene 4) ",
        "What an ass! (Hamlet, Act 2, Scene 2) ",
        "What a thrice-double ass! (The Tempest, Act 5, Scene 1) ",
        "Poisonous bunch-backed toad! (Richard III, Act 1, Scene 3) ",
        "Here is the babe, as loathsome as a toad. (Titus Andronicus, Act 4, Scene 2) ",
        "Like the toad; ugly and venomous. (As You Like It Act 2, Scene 1) ",
        "Thou cream faced loon! (Macbeth. Act 5, Scene 3) ",
        "Bottled spider! (Richard III, Act 1, Scene 3) ",
        "A rare parrot-teacher! (Much Ado About Nothing, Act 1, Scene 1) ",
        "Come, come, you froward and unable worms! (The Taming Of The Shrew, Act 5, Scene 2) ",
        "A weasel hath not such a deal of spleen as you are toss’d with. (Henry IV, Part 1, Act 2, Scene 3) ",
        "Pigeon-liver’d and lack gall. (Hamlet, Act 2, Scene 2) ",
        "She hath more hair than wit, and more faults than hairs, and more wealth than faults.  (Two Gentlemen of Verona, Act 3, Scene 1) ",
        "No longer from head to foot than from hip to hip, she is spherical, like a globe, I could find out countries in her. (The Comedy of Errors, Act 3, Scene 2) ",
        "You have such a February face, so full of frost, of storm and cloudiness. (Much Ado About Nothing, Act 5, Scene 4) ",
        "I am sick when I do look on thee. (A Midsummer Night’s Dream. Act 2, Scene 1) ",
        "Out of my sight! thou dost infect my eyes. (Richard III, Act 1, Scene 2) ",
        "Thou art a boil, a plague sore, an embossed carbuncle in my corrupted blood. (King Lear, Act 2, Scene 4) ",
        "The rankest compound of villainous smell that ever offended nostril. (The Merry Wives of Windsor Act 3, Scene 5) ",
        "The tartness of his face sours ripe grapes. (The Comedy of Errors Act 5, Scene 4) ",
        "Her face is not worth sunburning. (Henry V, Act 5, Scene 2) ",
        "Thou art as fat as butter. (Henry IV Part 1, Act 2, Scene 4) ",
        "Thou lump of foul deformity (Richard III, Act 1, Scene 2) ",
        "O you beast! I’ll so maul you and your toasting-iron, That you shall think the devil is come from hell. (King John, Act 4, Scene 3) ",
        "By mine honour, if I were but two hours younger, I’d beat thee. Methink’st thou art a general offence, and every man should beat thee. (All’s Well That Ends Well, Act 2, Scene 3) ",
        "I’ll beat thee, but I would infect my hands. (Timon of Athens, Act 4, Scene 3) ",
        "Would thou wouldst burst! (Timon of Athens, Act 4, Scene 3) ",
        "Thou hateful wither’d hag! (Richard III, Act I, Scene 3) ",
        "You should be women, and yet your beards forbid me to interpret that you are so. (Macbeth, Act 1, Scene 3) ",
        "My wife’s a hobby horse! (The Winter’s Tale Act 1, Scene 2) ",
        "You poor, base, rascally, cheating lack-linen mate! (Henry IV Part II, Act 2, Scene 4) ",
        "Whoreson caterpillars, bacon-fed knaves! (Henry IV Part I, Act 2, Scene 2) ",
        "This woman’s an easy glove, my lord, she goes off and on at pleasure. (All’s Well That Ends Well, Act 5, Scene 3) ",
        "Your virginity breeds mites, much like a cheese. (All’s Well That Ends Well, Act 1, Scene 1) ",
        "Villain, I have done thy mother. (Titus Andronicus Act 4, Scene 2) ",
        "Away, you three-inch fool! (The Taming of the Shrew, Act 4, Scene 1) ",
        "That trunk of humours, that bolting-hutch of beastliness, that swollen parcel of dropsies, that huge bombard of sack, that stuffed cloak-bag of guts, that roasted Manningtree ox with pudding in his belly, that reverend vice, that grey Iniquity, that father ruffian, that vanity in years? (Henry IV Part 1, Act 2, Scene 4) ",
        "Thou flea, thou nit, thou winter-cricket thou! (The Taming of the Shrew, Act 3, Scene 3) ",
        "Thou art unfit for any place but hell. (Richard III, Act 1, Scene 2) ",
        "Thou clay-brained guts, thou knotty-pated fool, thou whoreson obscene greasy tallow-catch! (Henry IV Part 1. Act 2, Scene 4) ",
        "Thou damned and luxurious mountain goat. (Henry V, Act 4, Scene 4) ",
        "Thou elvish-mark’d, abortive, rooting hog! (Richard III, Act 1, Scene 3) ",
        "Thou leathern-jerkin, crystal-button, knot-pated, agatering, puke-stocking, caddis-garter, smooth-tongue, Spanish pouch! (Henry IV Part 1, Act 2, Scene 4) ",
        "Thou art a base, proud, shallow, beggarly, three-suited, hundred-pound, filthy worsted-stocking knave; a lily-liver’d, action-taking, whoreson, glass-gazing, superserviceable, finical rogue; one-trunk-inheriting slave; one that wouldst be a bawd in way of good service, and art nothing but the composition of a knave, beggar, coward, pandar, and the son and heir of a mongrel bitch.  (King Lear, Act 2, Scene 2) ",
        "You scullion! You rampallian! You fustilarian! I’ll tickle your catastrophe! (Henry IV Part 2, Act 2, Scene 1) ",
        "Bloody, bawdy villain! Remorseless, treacherous, lecherous, kindless villain! (Hamlet, Act 2, Scene 2) ",
        "Away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish! You tailor’s-yard, you sheath, you bow-case, you vile standing tuck! (Henry IV, Part 1, Act 2, Scene 4) "
    ]

    functions.sendMessage(message.channel, {
        "embed": {
            "title": userData[id].username + "'s Insult",
            "description": "Hey " + target + "! " + insultra[Math.floor(insultra.length * Math.random())],
            "color": 0x008000,
        }
    })
    return
}