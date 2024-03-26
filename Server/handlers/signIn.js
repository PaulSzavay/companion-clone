"use strict"
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const signIn = async (request, response) => {

    const { email, password } = request.body;

    console.log(request.params)

    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        const db = client.db("CompanionClone")
        const user = await db.collection("Users").findOne({ email })

        if(!user){
            response.status(404).json({status:404, message: "no account exists"})
        }

        console.log(user.password)

        const matchingPassword = await bcrypt.compare(password, user.password)
        console.log(matchingPassword)


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

