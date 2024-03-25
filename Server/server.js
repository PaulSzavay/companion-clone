'use strict';
const express = require('express');
const morgan = require("morgan");
const app = express();


app.use(express.json());
app.use(morgan("tiny"));

// endpoints
const { createUser } = require('./handlers/createUser');
const { getUser } = require('./handlers/getUser');



app.post("/api/createuser", createUser)

app.get("/api/users/:email", getUser)

const PORT = 5762



app.listen(PORT, () => {
  console.log("Listening on port", PORT)
})