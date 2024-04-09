"use strict"
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt")

require("dotenv").config();
const { MONGO_URI } = process.env;

const signIn = async (request, response) => {

    const { email, password } = request.body;

    const client = new MongoClient(MONGO_URI);

    try{
        await client.connect();
        const db = client.db("CompanionClone")
        const user = await db.collection("Users").findOne({ email })

        if(!user){
            response.status(404).json({status:404, message: "no account exists"})
        }

        const matchingPassword = await bcrypt.compare(password, user.password)

        if(!matchingPassword){
            response.status(401).json({status: 401, message: "User doesn't exist, please try again",})
        }
        else{
            response.status(200).json({status:200, data: user, message: "Successfully signed in"})
        }
    }

    // if // else //

    catch (error) {
        response.status(500).json({status:500, message:error.message})
    } finally {
        client.close();
    }
}

module.exports = { signIn }

