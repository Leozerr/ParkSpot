const express = require("express");

const app = express();
app.use(express.json());

var cors = require("cors");
app.use(cors());

const config = require("./config");

require("./routes")(app);

app.listen(config.PORT, () =>
  console.log("Server running on port", config.PORT)
);
