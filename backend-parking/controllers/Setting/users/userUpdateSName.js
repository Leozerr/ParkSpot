const sql = require("../../../sql");

module.exports = {
  async userUpdateSName(req, res) {
    const email = req.params.email;
    const newSurname = req.body.newSurname;

    try {
      sql.Connection.query(
        "UPDATE users SET surname = ? WHERE email = ?",
        [newSurname, email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Surname updated successfully!" });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
