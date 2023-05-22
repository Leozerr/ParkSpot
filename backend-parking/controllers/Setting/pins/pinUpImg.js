const sql = require("../../../sql");

module.exports = {
  async pinUpImg(req, res) {
    const symbol = req.params.symbol;
    const newImg = req.body.newImg;

    try {
      sql.Connection.query(
        "UPDATE pins SET image = ? WHERE symbol = ?",
        [newImg, symbol],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Image updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
