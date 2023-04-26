//Users
const { users } = require("./users/users");
const { userCreate } = require("./users/userCreate");
const { userSingle } = require("./users/userSingle");
const { userUpdatePass } = require("./users/userUpdatePass");
const { userDelete } = require("./users/userDelete");
const { userUpdateUName } = require("./users/userUpdateUName");

//Pins
const { pins } = require("./pins/pins");
const { pinSingle } = require("./pins/pinSingle");
const { pinCreate } = require("./pins/pinCreate");
const { pinDelete } = require("./pins/pinDelete");

module.exports = {
  users,
  userCreate,
  userSingle,
  userUpdatePass,
  userUpdateUName,
  userDelete,
  pins,
  pinSingle,
  pinCreate,
  pinDelete,
};
