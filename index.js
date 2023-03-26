//require('dotenv').config({ path: './keys.env' })
var hi = require("./hi");

// Import discord.js and create the client
const Discord = require('discord.js')
const client = new Discord.Client();

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('#hi', { type: 'WATCHING' })
})

// Register an event to handle incoming messages
client.on('message', async msg => {
    hi.checkHi(msg, client);
})

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(process.env.LOGIN);