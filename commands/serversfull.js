const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
    "name":"apistatus",
    "enabled":true,
    "description":"idek man, i think it gets the api status",
    "help":"there are like things here, idk, that mean some status things",
    async run (message, client) {

        //API Token Request
        const params = new URLSearchParams();
        params.append('username', config.mcssUsername);
        params.append('password', config.mcssPassword);
        try {
            apiToken = await fetch(`${config.mcssURL}:${config.mcssPort}/api/token`, { method: 'POST', body: params })
            .then(response => response.json());
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("ERROR:")
                .setDescription(`Reason: ${error.name}`);
            message.channel.send(embed);
            return;
        }

        //API Servers Request
        const headers = {
            `Authorization`: `Bearer ${apiToken.access_token}`
        }
        try {
            apiMessage = await fetch(config.mcssURL + ":" + config.mcssPort + "/api/servers", { headers: headers })
            .then(response => response.json())
        } catch(error) {
            let embed = new Discord.MessageEmbed()
                .setColor("#e63939")
                .setTitle("ERROR:")
                .setDescription(`Reason: ${error.name}`);
            message.channel.send(embed);
            return;
        }

        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Servers:")

        for(server in apiMessage) {
            statusTypes = [
                "css\n[OFFLINE]",
                "ini\n[ONLINE]",
                "css\n[NONE]",
                "fix\n[STARTING]",
                "css\n[STOPPING]" ];

            embed.addField("**Server " + server + 1 + "**", "**Server Name: **```" + apiMessage[loop].Name + "```" + 
            "\n**Server Status: **" + status + 
            "\n**Server ID: **```" + apiMessage[loop].Guid + "```" + 
            "\n**Server Path: **```" + apiMessage[loop].PathToFolder + "```" + 
            "\n**Auto Start: **```" + apiMessage[loop].IsSetToAutoStart + "```" + 
            "\n**Keep Online Mode: **```" + apiMessage[loop].KeepOnline + "```",true);
        }
        message.channel.send(embed);
    }
}
