// Init socket
const socket = io();

// Init UI
const ui = new UI();

// Init elements
const loginForm = document.forms["login-form"];
const userName = loginForm.elements["username"];
const messageForm = document.forms["send-message"];
const message = messageForm.elements["message"];
const roomList = document.querySelector(".rooms-list");

// Init local vars
let currentRoom;
