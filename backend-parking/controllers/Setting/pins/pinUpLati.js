const sql = require("../../../sql");

module.exports = {
  async pinUpLati(req, res) {
    const symbol = req.params.symbol;
    const newLati = req.body.newLati;

    try {
      sql.Connection.query(
        "UPDATE pins SET latitude = ? WHERE symbol = ?",
        [newLati, symbol],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Latitude updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
