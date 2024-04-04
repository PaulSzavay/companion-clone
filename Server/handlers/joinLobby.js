"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const joinLobby = async (request, response) => {

const {lobbyId, username} = request.body;

console.log(lobbyId, username)

const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("CompanionClone")

        const updateDoc = { $push: {"players": username}}

        const addPlayer = await db.collection("Events").updateOne({"lobbyId":lobbyId}, updateDoc);

        if(addPlayer.acknowledged === true && addPlayer.modifiedCount === 1){
            response.status(200).json({status:200, lobbyId:lobbyId})
        }
        else{
            response.status(404).json({status:404, message:"Error"})
        }

    }
    catch (error) {
        return response.status(500).json({status:500, message:error.message})
    }
    finally {
        client.close();
    }


}

module.exports = { joinLobby }