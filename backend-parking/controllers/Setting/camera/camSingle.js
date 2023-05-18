const sql = require("../../../sql");

module.exports = {
  async camSingle(req, res) {
    const name = req.params.name;

    try {
      sql.Connection.query(
        "SELECT * FROM camera WHERE name = ?",
        [name],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json(results);
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
