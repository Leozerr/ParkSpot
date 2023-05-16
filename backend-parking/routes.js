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
  app.get("/password/:email", setting.comparePass);
  app.post("/login", setting.login);

  //Pins
  app.get("/pins", setting.pins);
  app.get("/pins/:symbol", setting.pinSingle);
  app.post("/create/pins", setting.pinCreate);
  app.delete("/delete/pins/:symbol", setting.pinDelete);
  app.patch("/update/pins/image/:symbol", setting.pinUpImg);
  app.patch("/update/pins/name/:symbol", setting.pinUpName);
  app.patch("/update/pins/latitude/:symbol", setting.pinUpLati);
  app.patch("/update/pins/longtitude/:symbol", setting.pinUpLongti);

  //Camera
  app.get("/camera", setting.camera);
  app.get("/camera/:name", setting.camSingle);
  app.get("/location/:location", setting.camSingle);
  app.post("/create/camera", setting.camCreate);
};
