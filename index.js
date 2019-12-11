const express = require("express");

const app = express();
const port = process.env.port || 3000;

// set up server
const serverInstance = app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});

// set up socket
const io = require("socket.io").listen(serverInstance);
