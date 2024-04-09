const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const checkIfPlayerOrOwner = async (request, response) => {

  const client = new MongoClient(MONGO_URI);

  const { username, lobbyId } = request.body

  try {
    await client.connect();
    const db = client.db("CompanionClone");

    const findLobby = await db.collection("Events").findOne({ lobbyId })

    if(findLobby){
        response.status(200).json({status:200, owner:findLobby.eventOwner.includes(username), joined:findLobby.players.includes(username)})
    }
    
  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = { checkIfPlayerOrOwner };