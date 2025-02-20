const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    name: "help",
    enabled: true,
    description: "Displays the bots commands.",
    //"apistatus":"Displays the connection to the api.",
    //"version":"Displays the version of mcss, api, and whether it's a dev build or not.",
    //"servers":"Displays all the servers you have on mcss.",
    //"serversfull":"Displays more information on all the servers you have on mcss.",
    async run(client, interaction) {
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Commands:")
        for(command of client.commands) {
            if(command[1].enabled) embed.addField(`/${command[1].name}`, command[1].description);
        }

        interaction.reply({ embeds: [embed] })
    }
}
