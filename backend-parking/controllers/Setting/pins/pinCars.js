const sql = require("../../../sql");

module.exports = {
  async pinCars(req, res) {
    const symbol = req.params.symbol;
    const cars = req.body.cars;

    try {
      sql.Connection.query(
        "UPDATE pins SET cars = ? WHERE symbol = ?",
        [cars, symbol],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Cars updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
