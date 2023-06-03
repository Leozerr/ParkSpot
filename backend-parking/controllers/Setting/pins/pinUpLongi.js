const sql = require("../../../sql");

module.exports = {
  async pinUpLongi(req, res) {
    const symbol = req.params.symbol;
    const newLongi = req.body.newLongi;

    try {
      sql.Connection.query(
        "UPDATE pins SET longitude = ? WHERE symbol = ?",
        [newLongi, symbol],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Longitude updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
