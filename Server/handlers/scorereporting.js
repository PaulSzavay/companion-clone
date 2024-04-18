"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const scorereporting = async (request, response) => {

const {currentLobby, loggedInUser, newPairings} = request.body;


const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db("CompanionClone")

        const lobby = await db.collection("Events").findOne({lobbyId:currentLobby});
        

        const findPlayerTable = lobby.tables.map((table)=>{
            return table.includes(loggedInUser)
            })
    
            let tableIndex = findPlayerTable.indexOf(true)

            const pairingArrayIndex = lobby.pairings[0][tableIndex].map((player)=>{
                return player[0] === loggedInUser
            })

            const updatePairingArray = lobby.pairings

            let originalArray = lobby.pairings

            // console.log(originalArray[0][tableIndex][pairingArrayIndex.indexOf(true)])
            // console.log(newPairings)

            originalArray[0][tableIndex][pairingArrayIndex.indexOf(true)] = newPairings

            const updateLobby = await db.collection("Events").updateOne({lobbyId: currentLobby}, {$set : {"pairings": originalArray}})

            console.log(updateLobby)
            
            // console.log(updateLobby)
            response.status(200).json({status:200, originalArray})


    }
    catch (error) {
        return response.status(500).json({status:500, message:error.message})
    }
    finally {
        client.close();
    }


}

module.exports = { scorereporting }