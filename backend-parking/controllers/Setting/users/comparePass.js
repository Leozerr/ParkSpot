const sql = require("../../../sql");
const bcrypt = require("bcrypt");

module.exports = {
  async comparePass(req, res) {
    const email = req.params.email;
    const password = req.body.password;

    try {
      sql.Connection.query(
        "SELECT password AS hashedPassword FROM users WHERE email = ?",
        [email],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          } else {
            const hashedPassword = results[0].hashedPassword;
            bcrypt.compare(password, hashedPassword, function (err, result) {
              if (result) {
                return res.status(200).json({ message: "Correct password" });
              } else {
                return res.status(200).json({ message: "Wrong password" });
              }
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  },
};
