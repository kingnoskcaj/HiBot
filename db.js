//Import MongoDB and setup connection
var uri = "mongodb+srv://zigliki-admin:" + process.env.MONGO_PWD + "@hibot.nectjrd.mongodb.net/?retryWrites=true&w=majority";
var MongoClient = require('mongodb');

async function newServer(serverId, botChannel) {
    //connect to DB
    const dbclient = new MongoClient.MongoClient(uri);
    const database = dbclient.db("HiBot");
    const collection = database.collection("hi");

    //check to see if the server has been connected before
    const query = { server: serverId };
    var server = await collection.findOne(query);
    if (server == null) {
        //new to server
        //create document then push
        const doc = {
            server: serverId,
            botControl: botChannel,
            lastUser: 0,
            lastHi: 0,
            nextHi: 0
        }
        const result = await collection.insertOne(doc);
    }

    await dbclient.close();
}

async function setHi(data) {
    //connect to DB
    const dbclient = new MongoClient.MongoClient(uri);
    const database = dbclient.db("HiBot");
    const collection = database.collection("hi");

    //set updates then push
    const doc = {
        $set: {
            server: data.server,
            botControl: data.botControl,
            lastUser: data.lastUser,
            lastHi: data.lastHi,
            nextHi: data.nextHi
        },
    }
    const query = { server: data.server };
    const result = await collection.updateOne(query, doc);

    await dbclient.close();
}

async function getHi(serverId) {
    //conect to DB
    const dbclient = new MongoClient.MongoClient(uri);
    const database = dbclient.db("HiBot");
    const collection = database.collection("hi");

    //get the file that has the data
    const query = { server: serverId };
    var server = await collection.findOne(query);
    if (server == null) {
        await newServer(serverId);
        server = await collection.findOne(query);
    }

    await dbclient.close();
    return (server);
}

async function setOutputChannel(serverId, channelId){
   //connect to DB
   const dbclient = new MongoClient.MongoClient(uri);
   const database = dbclient.db("HiBot");
   const collection = database.collection("hi");

   //set updates then push
   const doc = {
       $set: {
           botControl: channelId,
       },
   }
   const query = { server: serverId };
   const result = await collection.updateOne(query, doc);

   await dbclient.close();
}

module.exports = { newServer, getHi, setHi, setOutputChannel }