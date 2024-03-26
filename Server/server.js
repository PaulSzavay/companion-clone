'use strict';
const express = require('express');
const morgan = require("morgan");
const app = express();


app.use(express.json());
app.use(morgan("tiny"));

// endpoints
const { createUser } = require('./handlers/createUser');
const { getUser } = require('./handlers/getUser');
const { signIn } = require('./handlers/signIn');



app.post("/api/createuser", createUser)

app.get("/api/user/:email", getUser)

app.post("/api/finduser", signIn)

const PORT = 5762



app.listen(PORT, () => {
  console.log("Listening on port", PORT)
})