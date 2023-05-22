const sql = require("../../../sql");

module.exports = {
  async camera(req, res) {
    try {
      sql.Connection.query("SELECT * FROM camera", (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json(results);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
