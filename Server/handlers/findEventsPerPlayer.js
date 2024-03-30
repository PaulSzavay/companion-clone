const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const findEventsPerPlayer = async (request, response) => {

  const client = new MongoClient(MONGO_URI, options);

  const { email } = request.params


  try {
    await client.connect();
    const db = client.db("CompanionClone");

    const findUser = await db.collection("Users").findOne({ email })

    const findOwner = await db.collection("Events").find({ "eventOwner":findUser.username })

    const ownerArray = await findOwner.toArray();

    const findPlayers = await db.collection("Events").find({ "players": findUser.username })

    const playerArray = await findPlayers.toArray();

    if(playerArray || ownerArray){
        response.status(200).json({status:200, events:{playerArray, ownerArray}})
    }
    
  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = { findEventsPerPlayer };