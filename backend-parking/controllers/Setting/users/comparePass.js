const sql = require("../../../sql");
const bcrypt = require("bcrypt");

module.exports = {
  async comparePass(req, res) {
    const email = req.params.email;
    const password = req.body.password;

    try {
      sql.Connection.query(
        "SELECT password AS hashedPasswordFromDatabase FROM users WHERE email = ?",
        [email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          } else {
            const hashedPasswordFromDatabase =
              results[0].hashedPasswordFromDatabase;
            bcrypt.compare(
              password,
              hashedPasswordFromDatabase,
              function (err, result) {
                if (result) {
                  res.status(200).json({ message: "Correct password" });
                } else {
                  return res.status(400).json({ message: "Wrong password" });
                }
              }
            );
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
