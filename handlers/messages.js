const moment = require("moment");

function handlemessages(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}
module.exports = handlemessages;
