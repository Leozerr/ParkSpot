module.exports = (app) => {
  const setting = require("./controllers/Setting/index");

  //Users
  app.get("/users", setting.users);
  app.get("/users/:email", setting.userSingle);
  app.post("/create/users", setting.userCreate);
  app.patch("/update/users/password/:email", setting.userUpdatePass);
  app.patch("/update/users/username/:email", setting.userUpdateUName);
  app.delete("/delete/users/:email", setting.userDelete);
  app.patch("/favorite/add/:email", setting.userAddFavorite);
  app.patch("/favorite/remove/:email", setting.userRemoveFavorite);

  //Pins
  app.get("/pins", setting.pins);
  app.get("/pins/:symbol", setting.pinSingle);
  app.post("/create/pins", setting.pinCreate);
  app.delete("/delete/pins/:symbol", setting.pinDelete);
};
