const chatform = document.querySelector("#chat-form");
const chatmessages = document.querySelector(".chat-messages");
const roomname = document.querySelector("#room-name");
const userlist = document.querySelector("#users");
const socket = io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});


//join chatroom
socket.emit("joinroom", { username, room });

//get room and users
socket.on("roomusers", ({ room, users }) => {
  outputroom(room);
  outputuser(users);
});

//message from server
socket.on("message", (message) => {
   outputmessage(message);
  //scroll down
  chatmessages.scrollTop = chatmessages.scrollHeight;
});

//add event listener to get chatform content
chatform.addEventListener("submit", (e) => {
  e.preventDefault();
  //get text from DOM
  const msg = e.target.elements.msg.value;
  //console.log(msg);

  const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  //emit chat message to server
  socket.emit("chatmessage", { username, room, msg });

  //clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputmessage(message) {
  const div = document.createElement("div");
  div.classList.add("messages");
  div.innerHTML = `<p class="name"><i class="fas fa-user"></i> ${message.username}<span>${message.time}</span></p>
  <p class="text">
  ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

function outputroom(room) {
  return (roomname.innerHTML = room);
}
function outputuser(users) {
  return (userlist.innerHTML = `${users
    .map((user) => `<li>${user.username}</li>`)
    .join("")}`);
}
