const sql = require("../../../sql");

module.exports = {
  async userDelete(req, res) {
    const email = req.params.email;

    try {
      sql.Connection.query(
        "DELETE FROM users WHERE email = ?",
        [email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ message: "No user with that email!" });
          }
          res.status(200).json({ message: "User deleted successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
