const sql = require("../../../sql");

module.exports = {
  async pinUpName(req, res) {
    const symbol = req.params.symbol;
    const newName = req.body.newName;

    try {
      sql.Connection.query(
        "UPDATE pins SET name = ? WHERE symbol = ?",
        [newName, symbol],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Name updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
