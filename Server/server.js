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
const { createEvent } = require('./handlers/createEvent');
const { getLobby } = require('./handlers/getLobby');
const { findEventsPerPlayer } = require('./handlers/findEventsPerPlayer');
const { deleteEvent } = require('./handlers/deleteEvent');
const { checkIfPlayerOrOwner } = require('./handlers/checkIfPlayerOrOwner');



app.post("/api/createuser", createUser)

app.get("/api/user/:email", getUser)

app.post("/api/finduser", signIn)

app.post("/api/createevent", createEvent)

app.get("/api/lobby/:lobbyId", getLobby)

// app.post("/api/checklobbies", findEventsPerPlayer)

app.get("/api/participant/:email", findEventsPerPlayer)

app.post("/api/deleteevent", deleteEvent)

app.post("/api/checkIfPlayerOrOwner", checkIfPlayerOrOwner)

const PORT = 5762



app.listen(PORT, () => {
  console.log("Listening on port", PORT)
})