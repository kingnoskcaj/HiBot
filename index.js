// Import discord.js and create the client
const Discord = require('discord.js')
const client = new Discord.Client();
const DAY_IN_MILLIS = 86400000;

var botControlChannel = null;
var hiChannel = null;
var lastUser = 0;
var lastHi = Date.now();
var nextHi = Date.now();
var pingHi = null//setImmediate(function () {});

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  botControlChannel = client.channels.cache.find(channel => channel.name === "bot-control")
  hiChannel = client.channels.cache.find(channel => channel.name === "hi")
})

// Register an event to handle incoming messages
client.on('message', async msg => {
    if(msg.channel == hiChannel){
        //check that the message was sent to #hi
        console.log("[" + msg.createdTimestamp + "]: \"" + msg.content + "\" from " + msg.member.user.tag)
        if(msg.content == "hi"){
            //message is hi
            console.log("  next \"hi\" expected at " + nextHi)
            if(msg.createdTimestamp < nextHi){
                //not long enough since last hi
                console.log("  not long enough since last \"hi\"")
                console.log("  deleting \"hi\"")
                msg.delete();
                //inform user why their hi is bad
                botControlChannel.send("Sorry <@" + msg.member.user.id + ">, you tried to say hi too soon :frowning: \nThe next hi can occur in " + msToTime(nextHi - msg.createdTimestamp));
            } else{
                //24 hours since last hi
                if(msg.member.user.id == lastUser){
                    //invalid hi
                    console.log("  same user as last \"hi\"")
                    console.log("  deleting \"hi\"")
                    msg.delete();
                    //inform user why their hi is bad
                    botControlChannel.send("Sorry <@" + msg.member.user.id + ">, you said the last hi\nLet somebody else say hi first :slight_smile:");
                } else {
                    //valid new hi
                    console.log("  valid \"hi\" from " + msg.member.user.tag)
                    console.log("  updating data")
                    lastHi = msg.createdTimestamp
                    nextHi = lastHi + DAY_IN_MILLIS;
                    lastUser = msg.member.user.id;
                    if(lastUser != client.user.id){
                        //if the last hi wasn't from the bot, set up a ping for 7 days
                        console.log("  resetting ping timer")
                        clearTimeout(pingHi);
                        pingHi = setTimeout(function () {
                            var channel = msg.channel;
                            channel.send("hi");
                            hasPinged = true;
                        }, DAY_IN_MILLIS * 7);
                    }
                }
            }
        } else {
            //message is not hi
            console.log("  message is not \"hi\"")
            console.log("  deleting message")
            msg.delete();
            //inform user that only hi is allowed
            botControlChannel.send("Only hi is allowed in <#" + hiChannel + "> <@" + msg.member.user.id + "> :rage:");
        }
    }
})

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login('MTA4ODE2MTMzMjY0MzIzMzgxMg.GTPzsf.M6qRGH7-pI0Cwww1b3SaggFIuS8i7nP8vI-zd8');