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
            let result1 = 0
            let result2 = 0
            for (let i = 0; i < table.length*0.5; i++) {
                let acrossFrom = table[(i + Math.floor(table.length/2)) % table.length]; // Calculate the index of the person sitting across
                if (i <= table.length*0.5 - 1) {
                    pairs.push([table[i], acrossFrom, result1, result2]);
                } else {
                    // If odd, last person has a bye
                    pairs.push([acrossFrom]);
                }
             }
             return pairs;
            });

            console.log(pairings)
            
            const updateDoc = { $push : { "pairings": pairings } , $set: { "phase": "Round1" }};
            const updateLobby = await db.collection("Events").updateOne({"lobbyId":currentLobby}, updateDoc);
            console.log(updateLobby)
            
            const newLobby = await db.collection("Events").findOne({lobbyId:currentLobby});
            //     if(lobby.phase === "Draft"){
            // }
            // else{
            //     let roundnumber = Number(lobby.phase.charAt(lobby.phase.length - 1 ))
            //     // to test this for future rounds
            //     let roundName = `Round${roundnumber}`
            //     console.log(roundName)
            //     const updateDoc = { $push: {"pairings": {roundName : pairings}}}
            // }

           
            if(updateLobby.modifiedCount === 1){
                response.status(200).json({status:200, message:newLobby})
            } 
            console.log(newLobby)


    }
    catch (error) {
        return response.status(500).json({status:500, message:error.message})
    }
    finally {
        client.close();
    }


}

module.exports = { Pairing }