const sql = require("../../../sql");

module.exports = {
  async camCreate(req, res) {
    const { name, src, location } = req.body;
    try {
      sql.Connection.query(
        "SELECT COUNT(*) AS cnt FROM camera WHERE name = ? ",
        req.body.name,
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            if (data[0].cnt > 0) {
              return res.status(400).json({ message: "Name already exist" });
            } else {
              sql.Connection.query(
                "INSERT INTO camera(name, src, location) VALUES(?, ?, ?)",
                [name, src, location],
                (err, results, fields) => {
                  if (err) {
                    console.log(
                      "Error while inserting a camera into database",
                      err
                    );
                    return res.status(400).send();
                  }
                  return res
                    .status(201)
                    .json({ message: "New camera successfully created!" });
                }
              );
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
