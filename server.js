const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");
const handlemessages = require("./handlers/messages");
const {
  userjoin,
  getcurrentuser,
  userleave,
  getroomuser,
} = require("./handlers/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);


  //on connection
  io.on("connection", (socket) => {
    socket.on("joinroom", ({ username, room }) => {
      const user = userjoin(socket.id, username, room);

      socket.join(user.room);

      //welcome current user
      socket.emit("message", handlemessages("chat app", "welcome to chatapp"));

      //broadcast when a user emit
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          handlemessages("chat app", `${user.username} has joined the chat`)
        );

      //send room and users
      io.to(user.room).emit("roomusers", {
        room: user.room,
        users: getroomuser(user.room),
      });
    });

    //listen for chatmessage
    socket.on("chatmessage", ({ username, room, msg }) => {
      const user = userjoin(socket.id, username, room);
      io.to(user.room).emit("message", handlemessages(user.username, msg));
    });

    // on disconnection
    socket.on("disconnect", () => {
      const user = userleave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          handlemessages("chat app", `${user.username} has left the chat`)
        );

        //send room and users
        io.to(user.room).emit("roomusers", {
          room: user.room,
          users: getroomuser(user.room),
        });
      }
    });
  });

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
server.listen(port, () => {
  console.log(`running on port ${port}`);
});
