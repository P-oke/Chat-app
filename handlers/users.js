const users = [];

function userjoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);
  return user;
}

function getcurrentuser(id) {
  return users.find((user) => {
    user.id === id;
  });
}

function userleave(id) {
  const find = users.findIndex((user) => user.id === id);

  if (find !== -1) {
    return users.splice(find, 1)[0];
  }
}

function getroomuser(room) {
  return users.filter((user) => room === user.room);
}

module.exports = { userjoin, getcurrentuser, userleave, getroomuser };
