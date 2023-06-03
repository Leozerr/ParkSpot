const sql = require("../../../sql");

module.exports = {
  async userRemoveFavorite(req, res) {
    const email = req.params.email;
    const removeFavorite = req.body.removeFavorite + ",";

    try {
      sql.Connection.query(
        "UPDATE users SET favorite = REPLACE(favorite, ?, '') WHERE email = ?",
        [removeFavorite, email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Favorite removed successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
