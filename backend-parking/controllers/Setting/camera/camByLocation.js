const sql = require("../../../sql");

module.exports = {
  async camByLocation(req, res) {
    const location = req.params.location;

    try {
      sql.Connection.query(
        "SELECT * FROM camera WHERE location = ?",
        [location],
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
