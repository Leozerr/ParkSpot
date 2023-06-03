const sql = require("../../../sql");

module.exports = {
  async pinDelete(req, res) {
    const symbol = req.params.symbol;

    try {
      sql.Connection.query(
        "DELETE FROM pins WHERE symbol = ?",
        [symbol],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ message: "No pin with that symbol!" });
          }
          res.status(200).json({ message: "Pin deleted successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
