const sql = require("../../../sql");

module.exports = {
  async userUpdateUName(req, res) {
    const email = req.params.email;
    const newUsername = req.body.newUsername;

    try {
      sql.Connection.query(
        "UPDATE users SET username = ? WHERE email = ?",
        [newUsername, email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Username updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
