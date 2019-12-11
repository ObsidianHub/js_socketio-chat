const express = require("express");

const app = express();
const port = process.env.port || 3000;

// set up server
const serverInstance = app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});

// set up socket
const io = require("socket.io").listen(serverInstance);

app.use(express.static("public"));

// set up routes
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// users currently connected
const usernames = {};
// list of rooms
const rooms = ["room1", "room2", "some other room"];
const default_room = rooms[0];
