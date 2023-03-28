function botCommands(message, client){
    const prefix = "<@" + client.user.id + ">";
    const [attention, command, ...args] = message.content.split(" ");

    if(attention == prefix) {
        if(message.member.guild.me.hasPermission('ADMINISTRATOR') || message.member.user.id == process.env.DEV){
            switch(command){
                case("output"):
                    setOutputChannel(client, message.guild.id, args[0].slice(2, args[0].length - 1));
                    break;
                case("stats"):
                case("my-stats"):
                    getUserStats(message);
                    break;
                case("top"):
                case("top-stats"):
                    getTopFive(message);
                    break;
            }
        }
        if(message.member.user.id == process.env.DEV){
            switch(command){
                case("pic"):
                    setBotProfilePicture(client, args[0]);
                    break;
                case("status"):
                    setBotStatus(client, args[0], args[1]);
                    break;
            }
        }
    }

}

async function setOutputChannel(client, serverId, channelId){
    await require("./db").setOutputChannel(serverId, channelId);
    client.channels.cache.get(channelId).send("<@" + client.user.id + "> will output to this channel now :+1:");
}

function setBotProfilePicture(client, url){
    //default picture url https://live.staticflickr.com/3733/13275161795_c98535afe8_n.jpg
    client.user.setAvatar(url);
}

function setBotStatus(client, message, type){
    client.user.setActivity(message, { type: type })
}

function getUserStats(message){
    //TODO
}

function getTopFive(message){
    //TODO
}

module.exports = { botCommands }
