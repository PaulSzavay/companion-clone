'use strict';
const express = require('express');
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 5762


      express()
      app.use((req, res, next) => {
        const allowedOrigins = ['companion-clone-akypew2l1-paulszavays-projects.vercel.app', 'http://localhost:3000'];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
          res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
      })



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
const { joinLobby } = require('./handlers/joinLobby');
const { startEvent } = require('./handlers/startEvent');
const { Pairing } = require('./handlers/Pairing');
const { scorereporting } = require('./handlers/scorereporting');

app.get('/hello', (_, res) => res.send('Hello from CompanionClone'))

app.post("/api/createuser", createUser)

app.get("/api/user/:email", getUser)

app.post("/api/finduser", signIn)

app.post("/api/createevent", createEvent)

app.get("/api/lobby/:lobbyId", getLobby)

// app.post("/api/checklobbies", findEventsPerPlayer)

app.get("/api/participant/:email", findEventsPerPlayer)

app.post("/api/deleteevent", deleteEvent)

app.post("/api/checkIfPlayerOrOwner", checkIfPlayerOrOwner)

app.post("/api/joinevent", joinLobby)

app.post("/api/startevent", startEvent)

app.post("/api/pairing", Pairing)

app.post("/api/scorereporting", scorereporting)




app.listen(PORT, () => {
  console.log("Listening on port", PORT)
})