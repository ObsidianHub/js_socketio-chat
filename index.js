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

io.on('connection', socket => {
  let isUser = false;

  // send list of rooms to client
  socket.emit("rooms", rooms);

  socket.on("new user", name => {
    if (isUser) return;

    socket.username = name;
    usernames[name] = { room: default_room, id: socket.id }; // save room to the username[user]
    isUser = true;

    socket.room = default_room;
    socket.join(default_room);

    socket.emit("welcome", socket.room); // to the user

    socket.broadcast.to(socket.room).emit("new user joined", socket.username); // to everyone in the room except the user

    io.emit("roommates", { usernames, room: socket.room }); // update list of room users
    io.emit("updateusers", usernames); // update list of users
  });

  socket.on("disconnect", () => {
    if (!socket.username) return;

    io.emit("chat message", {
      message: `${socket.username} has gone offline`,
      username: false
    });

    delete usernames[socket.username];

    io.emit("updateusers", usernames);
    io.emit("roommates", { usernames, room: socket.room });
  });

  socket.on("message", msg => {
    io.sockets
      .in(socket.room)
      .emit("chat message", { message: msg, username: socket.username });
  });
});