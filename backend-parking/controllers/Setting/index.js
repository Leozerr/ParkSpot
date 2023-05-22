//Users
const { users } = require("./users/users");
const { userCreate } = require("./users/userCreate");
const { userSingle } = require("./users/userSingle");
const { userUpdatePass } = require("./users/userUpdatePass");
const { userDelete } = require("./users/userDelete");
const { userUpdateUName } = require("./users/userUpdateUName");
const { userAddFavorite } = require("./users/userAddFavorite");
const { userRemoveFavorite } = require("./users/userRemoveFavorite");
const { comparePass } = require("./users/comparePass");
const { login } = require("./users/login");
const { userFavorite } = require("./users/userFavorite");
const { userUpdateProfile } = require("./users/userUpdateProfile");

//Pins
const { pins } = require("./pins/pins");
const { pinSingle } = require("./pins/pinSingle");
const { pinCreate } = require("./pins/pinCreate");
const { pinDelete } = require("./pins/pinDelete");
const { pinUpImg } = require("./pins/pinUpImg");
const { pinUpName } = require("./pins/pinUpName");
const { pinUpLati } = require("./pins/pinUpLati");
const { pinUpLongi } = require("./pins/pinUpLongi");

//Camera
const { camera } = require("./camera/camera");
const { camCreate } = require("./camera/camCreate");
const { camSingle } = require("./camera/camSingle");
const { camByLocation } = require("./camera/camByLocation");

module.exports = {
  //User Export
  users,
  userCreate,
  userSingle,
  userUpdatePass,
  userUpdateUName,
  userDelete,
  userAddFavorite,
  userRemoveFavorite,
  comparePass,
  login,
  userFavorite,
  userUpdateProfile,

  //Pin Export
  pins,
  pinSingle,
  pinCreate,
  pinDelete,
  pinUpImg,
  pinUpName,
  pinUpLati,
  pinUpLongi,

  //Camera Export
  camera,
  camCreate,
  camSingle,
  camByLocation,
};
