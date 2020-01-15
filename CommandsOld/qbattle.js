module.exports = function (message) {
	let id = message.author.id
	if (userData[id].status == 0) { return; }
	let words = message.content.split(/\s+/)
	let channel = message.channel
	let target = ""
	let idavy = message.author.avatarURL
	let targetavy = ""
	let embedtext = "<@" + id + "> has created an open challenge!\nReact to accept their challenge."
	let text = {
		embed: {
			color: 0xfaa920,
			thumbnail: {
				url: idavy
			},
			fields: [
				{
					name: "⚔ Open Quick Duel Challenge ⚔",
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
			return ['⚔'].includes(reaction.emoji.name) && user.id != id && user.id != 579335308638945304 && userData[id] != null && userData[id].status != 0;
		};
		message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '⚔') {
					functions.sendMessage(message.channel, {
						embed: {
							color: 0xfaa920,
							thumbnail: {
								url: targetavy
							},
							fields: [
								{
									name: "⚔ Open Quick Duel Challenge ⚔",
									value: "<@" + target + "> and <@" + id + "> are dueling for 20 seconds. Who will win?",
									inline: false
								}
							],
							/*footer: {
								text: "Dun dunnn dunn dunn :)"
							}*/
						}
					})
					setTimeout(() => {
						if (message.channel, display.duel(id, target)) {
							functions.sendMessage(message.channel, {
								embed: {
									color: 0xfaa920,
									thumbnail: {
										url: idavy
									},
									fields: [
										{
											name: "⚔ Open Quick Duel Challenge ⚔",
											value: "<@" + id + "> defeated <@" + target + "> and earned " + display.battlewin(id, target) + " sr!",
											inline: false
										}
									],
									/*footer: {
										text: "Dun dunnn dunn dunn :)"
									}*/
								}
							})
							
						} else {
							functions.sendMessage(message.channel, {
								embed: {
									color: 0xfaa920,
									thumbnail: {
										url: targetavy
									},
									fields: [
										{
											name: "⚔ Open Quick Duel Challenge ⚔",
											value: "<@" + target + "> defeated <@" + id + "> and earned " + display.battlewin(target, id) + " sr!",
											inline: false
										}
									],
									/*footer: {
										text: "Dun dunnn dunn dunn :)"
									}*/
								}
							})
							//display.battlewin(target, id)
						}
					}, 20000);
				} else {
					functions.sendMessage(message.channel, "Battle Canceled.")
				}
			})
			.catch(collected => {
				//functions.sendMessage(message.channel, "No response")
				//console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
				functions.sendMessage(message.channel, "<@" + id + ">'s quick battle challenge has timed out.");
			});
	}).catch(function (err) {
		console.error(err)
	})
}