module.exports = (app) => {
  const setting = require("./controllers/Setting/index");

  //Users
  app.get("/users", setting.users);
  app.get("/users/:email", setting.userSingle);
  app.post("/create/users", setting.userCreate);
  app.patch("/update/users/password/:email", setting.userUpdatePass);
  app.patch("/update/users/username/:email", setting.userUpdateUName);
  app.patch("/update/users/firstname/:email", setting.userUpdateFName);
  app.patch("/update/users/surname/:email", setting.userUpdateSName);
  app.delete("/delete/users/:email", setting.userDelete);

  //Pins
  app.get("/pins", setting.pins);
};
