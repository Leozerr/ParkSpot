const sql = require("../../../sql");

module.exports = {
  async pinSingle(req, res) {
    const symbol = req.params.symbol;

    try {
      sql.Connection.query(
        "SELECT * FROM pins WHERE symbol = ?",
        [symbol],
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
