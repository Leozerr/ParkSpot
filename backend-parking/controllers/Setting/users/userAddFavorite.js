const sql = require("../../../sql");

module.exports = {
  async userAddFavorite(req, res) {
    const email = req.params.email;
    const newFavorite = req.body.newFavorite + ",";

    try {
      sql.Connection.query(
        "UPDATE users SET favorite = CONCAT(favorite, ?) WHERE email = ?",
        [newFavorite, email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Favorite added successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
