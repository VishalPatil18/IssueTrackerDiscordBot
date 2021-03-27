const dotenv = require('dotenv').config();
const fs = require("fs");

// Creating a express server
const express = require("express");

const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const discord = require('discord.js');

const client = new discord.Client()
client.commands = new discord.Collection();
const prefix = process.env.PREFIX;

client.login(process.env.DISCORD_BOT_TOKEN)
let channel;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', async () => {
    channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_NUMBER)
    console.log("THE BOT IS READY");
})

client.on('message', (msg) => {
    if(msg.author.bot || !msg.content.startsWith(prefix)) return;
    // message.reply('Hey! WHats UP!');
    args = msg.content.slice(prefix.length).trim().split(/ +/);
    command = args.shift().toLowerCase();
    // console.log(args, command);

    if(!client.commands.get(command)){
        return msg.reply("No such command found.");
    }
    command = client.commands.get(command);

    try{
        command.execute(msg, args);
    } catch(error) {
        console.log(error);
        return msg.channel.send("There was an error executing the command.");
    }

    // if(command === "hello"){
    //     return msg.reply(`Hello, ${args[0]}`);
    // }
})

client.on("githubMessage", (body) => {
    console.log(body);
    const action = body.action;
    const issueUrl = body.issue.html_url;
    if(action == "opened"){
        const message = `New issue created : ${issueUrl}`;
    }
})

app.post("/github", (req, res) => {
    console.log(req.body);
    // Do something here
    client.emit("githubMessage", req.body);
    return res.status(200).json({success: true});
})



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server started on port: ", port);
})