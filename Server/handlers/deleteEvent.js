"use strict";
const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const deleteEvent = async (request, response) => {

  const { currentLobby } = request.body;

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db("CompanionClone");

    const deleteTheEvent = await db.collection("Events").deleteOne({ lobbyId:currentLobby });

    return response.status(200).json({
      status: 204,
      message: "Event deleted",
      deleteTheEvent
    });

  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = {deleteEvent};