const sql = require("../../../sql");

module.exports = {
  async pinCreate(req, res) {
    const { sym, pname, lati, longti, img } = req.body;
    try {
      sql.Connection.query(
        "INSERT INTO pins(symbol, name, latitude, longtitude, image) VALUES(?, ?, ?, ?, ?)",
        [sym, pname, lati, longti, img],
        (err, results, fields) => {
          if (err) {
            console.log("Error while inserting a user into database", err);
            return res.status(400).send();
          }
          return res
            .status(201)
            .json({ message: "New pin successfully created!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
