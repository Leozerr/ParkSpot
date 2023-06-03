const sql = require("../../../sql");

module.exports = {
  async pinUpFL(req, res) {
    const symbol = req.params.symbol;
    const fullSlots = req.body.fullSlots;

    try {
      sql.Connection.query(
        "UPDATE pins SET fullSlots = ? WHERE symbol = ?",
        [fullSlots, symbol],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Full Slots updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
