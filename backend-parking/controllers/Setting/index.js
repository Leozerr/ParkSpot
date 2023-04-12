const { users } = require("./users/users");
const { userCreate } = require("./users/userCreate");
const { userSingle } = require("./users/userSingle");
const { userUpdatePass } = require("./users/userUpdatePass");
const { userDelete } = require("./users/userDelete");
const { userUpdateUName } = require("./users/userUpdateUName");
const { userUpdateFName } = require("./users/userUpdateFName");
const { userUpdateSName } = require("./users/userUpdateSName");

const { pins } = require("./pins/pins");

module.exports = {
  users,
  userCreate,
  userSingle,
  userUpdatePass,
  userUpdateUName,
  userUpdateFName,
  userUpdateSName,
  userDelete,
  pins,
};
