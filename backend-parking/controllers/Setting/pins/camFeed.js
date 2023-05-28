const sql = require("../../../sql");

module.exports = {
  async camFeed(req, res) {
    const symbol = req.params.symbol;
    const camFeed = req.body.camFeed;

    try {
      sql.Connection.query(
        "UPDATE pins SET camfeed = ? WHERE symbol = ?",
        [camFeed, symbol],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Camfeed updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
