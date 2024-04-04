"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const startEvent = async (request, response) => {

const {currentLobby} = request.body;

const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("CompanionClone")

        let numberTables = 0

        // finds Lobby
        const findLobby = await db.collection("Events").findOne({lobbyId:currentLobby})

        // check # of players (6-11 = 1 table)
            if (findLobby.players.length < 6) {
                return response.status(400).json({status:400, message:"Not enough players to start event"})
            } else {
                let extraPlayers = findLobby.players.length - 5; // Excess players beyond the first table
                let tablesNeeded = Math.ceil(extraPlayers / 6); // Number of tables needed
                numberTables = tablesNeeded 
            }


        // Shuffles players array
            const shuffleArray = (array) => {
                
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
        shuffleArray(findLobby.players)

            const distributePeople = (array, totalTables) => {
                let totalPeople = array.length;
                // let minPeoplePerTable = 6;
                // let maxPeoplePerTable = 11;
                // let totalMaxPeople = maxPeoplePerTable * totalTables;
                let peoplePerTable = Math.floor(totalPeople / totalTables);
                let remainingPeople = totalPeople % totalTables;
                let tables = new Array(totalTables).fill([]);
            
                let currentIndex = 0;
                for (let i = 0; i < totalTables; i++) {
                    let tablePeople = peoplePerTable;
                    if (remainingPeople > 0) {
                        tablePeople++;
                        remainingPeople--;
                    }
                    tables[i] = array.slice(currentIndex, currentIndex + tablePeople);
                    currentIndex += tablePeople;
                }
            
                return tables;
            }
            
            // Example usage:
            const playerArray = findLobby.players
            const totalTables = numberTables;
            const tables = distributePeople(playerArray, totalTables);



        const updateEvent = await db.collection("Events").updateOne({ lobbyId:currentLobby}, { $set: { "phase": "Round 1" }, $set: {"Tables": tables}});

        console.log(findLobby)
    

        response.status(200).json({status:200, tables, findLobby, message:"Event has started"})

    }
    catch (error) {
        return response.status(500).json({status:500, message:error.message})
    }
    finally {
        client.close();
    }


}

module.exports = { startEvent }