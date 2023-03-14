const sql = require("../../../sql");

module.exports = {
  async userUpdateFName(req, res) {
    const email = req.params.email;
    const newFirstname = req.body.newFirstname;

    try {
      sql.Connection.query(
        "UPDATE users SET firstname = ? WHERE email = ?",
        [newFirstname, email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Firstname updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
