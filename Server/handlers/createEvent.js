"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');
const {generateId} = require("../helpers/generateLobbyId")


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createEvent = async (request, response) => {

    const { username } = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("CompanionClone");

    let lobbyId = generateId();

    const newEvent = await db.collection("Events").insertOne({_id:uuidv4(), lobbyId, players:[], phase:"Enrolling", eventOwner:username});

    console.log(newEvent)

    if(newEvent){
        response.status(201).json({status: 201, message: "Success, event has been created", lobbyId, eventOwner:username});
    }
  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = {createEvent};