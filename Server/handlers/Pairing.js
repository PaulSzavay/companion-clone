"use strict";
const { MongoClient } = require("mongodb");
const { join } = require("path");

require("dotenv").config();
const {MONGO_URI} = process.env;

const Pairing = async (request, response) => {

const {currentLobby} = request.body;


const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db("CompanionClone")
        const lobby = await db.collection("Events").findOne({lobbyId:currentLobby});


        const pairings = lobby.tables.map(table => {
            let pairs = [];
            for (let i = 0; i < table.length*0.5; i++) {
                let acrossFrom = table[(i + Math.floor(table.length/2)) % table.length]; // Calculate the index of the person sitting across
                if (i <= table.length*0.5 - 1) {
                    pairs.push([table[i], acrossFrom]);
                } else {
                    // For the last person, create a pair with themselves
                    pairs.push([acrossFrom]);
                }
             }
             return pairs;
            });
           
           console.log(pairings);

        response.status(200).json({status:200, message:lobby})


    }
    catch (error) {
        return response.status(500).json({status:500, message:error.message})
    }
    finally {
        client.close();
    }


}

module.exports = { Pairing }