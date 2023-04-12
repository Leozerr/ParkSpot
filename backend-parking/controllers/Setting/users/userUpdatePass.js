const sql = require("../../../sql");

module.exports = {
  async userUpdatePass(req, res) {
    const email = req.params.email;
    const newPassword = req.body.newPassword;

    try {
      sql.Connection.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [newPassword, email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res
            .status(200)
            .json({ message: "User password updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
