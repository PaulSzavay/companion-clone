"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const getLobby = async (request, response) => {

const {lobbyId} = request.params;

const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db("CompanionClone")
        const lobby = await db.collection("Events").findOne({lobbyId});

        if(lobby){
            return response.status(200).json({status:200, data:lobby});
        }
        else {
            return response.status(404).json({status:404, message: `No lobby found with ${lobbyId} id`});
        }
    }
    catch (error) {
        return response.status(500).json({status:500, message:error.message})
    }
    finally {
        client.close();
    }


}

module.exports = { getLobby }