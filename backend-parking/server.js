const express = require("express");
var cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

const config = require("./config");

require("./routes")(app);

app.listen(config.PORT, () =>
  console.log("Server running on port", config.PORT)
);
